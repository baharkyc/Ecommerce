import axiosInstance from "../../api/axiosInstance";
import { setLoading } from "./globalActions";

export const SET_USER = "SET_USER";
export const SET_ROLE = "SET_ROLE";
export const SET_THEME = "SET_THEME";
export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_ADDRESS = "SET_ADDRESS";
export const SET_CARD = "SET_CARD";
export const SET_SELECTED_ADDRESS_ID = "SET_SELECTED_ADDRESS_ID";
export const SET_SELECTED_CARD_ID = "SET_SELECTED_CARD_ID";
export const SET_SELECTED_BILLING_ADDRESS_ID = "SET_SELECTED_BILLING_ADDRESS_ID";
export const SET_LAST_ORDER = "SET_LAST_ORDER";
export const SET_PAST_ORDERS = "SET_PAST_ORDERS";

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
}

export const setRole = (roleId) => {
    return {
        type: SET_ROLE,
        payload: roleId,
    }
    
}

export const setTheme = (theme) => {
    return {
        type: SET_THEME,
        payload: theme,
    }
}

export const setLanguage = (language) => {
    return {
        type: SET_LANGUAGE,
        payload: language,
    }
}

export const setAddress = (address) => {
    return {
        type: SET_ADDRESS,
        payload: address,
    }
}

export const setCard = (card) => {
    return {
        type: SET_CARD,
        payload: card,
    }
}

export const setSelectedAddressId = (addressId) => {
    return {
        type: SET_SELECTED_ADDRESS_ID,
        payload: addressId,
    }
}

export const setSelectedCardId = (cardId) => {
    return {
        type: SET_SELECTED_CARD_ID,
        payload: cardId,
    }
}

export const setSelectedBillingAddressId = (billingAddressId) => {
    return {
        type: SET_SELECTED_BILLING_ADDRESS_ID,
        payload: billingAddressId,
    }
}

export const setLastOrder = (order) => {
    return {
        type: SET_LAST_ORDER,
        payload: order,
    }
}

export const setPastOrders = (pastOrdersList) => {
    return {
        type: SET_PAST_ORDERS,
        payload: pastOrdersList,
    }
}

export const fetchAddresses = () => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        const response = await axiosInstance.get("/user/address");
        
        console.log("Address fetch success");
        dispatch(setAddress(response.data));

    } catch (error) {
        console.error("Fetch address error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const saveAddress = (addressData) => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        await axiosInstance.post("/user/address", 
            addressData);
        dispatch(fetchAddresses());
        console.log("Address save success");
    

    } catch (error) {
        console.error("Save address error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const updateAddress = (addressData) => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        await axiosInstance.put("/user/address", 
        addressData);

        dispatch(fetchAddresses());
        console.log("Address update success");
    

    } catch (error) {
        console.error("Update address error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const deleteAddress = (addressId) => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        await axiosInstance.delete(`/user/address/${addressId}`);
        
        dispatch(fetchAddresses());
        console.log("Address delete success");

    } catch (error) {
        console.error("Delete address error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchCards = () => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        const response = await axiosInstance.get("/user/card");
        
        console.log("Card fetch success");
        dispatch(setCard(response.data));

    } catch (error) {
        console.error("Fetch cards error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const saveCreditCard = (cardData) => async (dispatch) => {

    dispatch(setLoading(true));

    try {
        await axiosInstance.post("/user/card", 
            cardData);
        dispatch(fetchCards());
        console.log("Card save success");
    

    } catch (error) {
        console.error("Save card error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const deleteCard = (cardId) => async (dispatch, getState) => {

    dispatch(setLoading(true));

    const state = getState();
    const selectedCardId = state.client.selectedCardId;

    try {
        await axiosInstance.delete(`/user/card/${cardId}`);

        if(selectedCardId === cardId) {
            dispatch(setSelectedCardId(""));
        }
        
        dispatch(fetchCards());
        console.log("Card delete success");

    } catch (error) {
        console.error("Delete card error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchPastOrders = () => async (dispatch) => {
    
    dispatch(setLoading(true));

    try {
        const response = await axiosInstance.get("/order");
        
        console.log("Past orders fetch success");
        dispatch(setPastOrders(response.data));

    } catch (error) {
        console.error("Fetch past orders error", error.message);       

    } finally {
        dispatch(setLoading(false));
    }
}

