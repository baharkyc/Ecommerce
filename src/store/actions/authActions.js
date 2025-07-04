import axiosInstance from "../../api/axiosInstance";
import { setUser } from "./clientActions";
import { toast } from "react-toastify";
import { setLoading } from "./globalActions";

export const LOGOUT_USER = "LOGOUT_USER";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export const setAuthenticated = (isAuthenticated) => {
    return {
        type: SET_AUTHENTICATED,
        payload: isAuthenticated,
    }
}

// thunk function (async)
export const loginUser = (data, history) => async (dispatch) => {
    
  try {
    const response = await axiosInstance.post("/login", data);

    console.log("Login successful");

    dispatch(setUser(response.data)); // Save user data to redux
    dispatch(setAuthenticated(true));

    const token = response.data.token; 

    axiosInstance.defaults.headers["Authorization"] = token; //Add token to axios headers
    
    if(data.remember)
      localStorage.setItem("token", token);

    history.push("/"); 

    toast.success("Login successful", {
      autoClose: 4000,

    });
  } catch (error) {
    console.error("Login error", error.message);

    toast.error("Please check your email or password", {
      autoClose: 4000,
    });

    throw error; // throw error to component for form reset
  }
};

export const logoutUser = () => {
    return (dispatch) => {
      // Remove token from localStorage
      localStorage.removeItem("token");
  
      // Remove token from axios default headers
      delete axiosInstance.defaults.headers['Authorization'];
  
      // Clear user from Redux
      dispatch(setUser(null));
      dispatch(setAuthenticated(false));
    };
};

export const setUserByToken = () => {return async (dispatch) => {

    const token = localStorage.getItem("token");

    if (token) {

      dispatch(setLoading(true));

      try {
          const response = await axiosInstance.get("/verify", {
          headers: {
              Authorization: token,
          },
          });

          console.log("Token verified, user set");
          const user = response.data;
          const newToken = response.data.token;

          localStorage.setItem("token", newToken);
          axiosInstance.defaults.headers["Authorization"] = newToken;
          dispatch(setUser(user));
          dispatch(setAuthenticated(true));

      } catch (err) {

          console.log("Error verifying token:", err);
          localStorage.removeItem("token");
          delete axiosInstance.defaults.headers["Authorization"];
          

      } finally {
        dispatch(setLoading(false));
      }

    } else {
      dispatch(setAuthenticated(false));
      console.log("No token found.");
    }
  };
};


