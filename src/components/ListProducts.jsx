import { useState, useEffect } from "react";
import ProductCardNoBorder from "./cards/ProductCardNoBorder";
import PaginationButton from "./buttons/PaginationButton";
import ProductCardList from "./cards/ProductCardList";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/actions/shoppingCartActions";



const ListProducts = ({ products, viewMode = "grid", pageNumber, setPageNumber }) => {

    const dispatch = useDispatch();

    const {limit, total} = useSelector(state => state.product)

    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (page) => {
        setPageNumber(page);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));

    }

    useEffect(() => {
        if(pageNumber == 1) {
            window.scrollTo(0, 200);
        }else
            window.scrollTo(0, 350); // Scroll to page start
        }, [pageNumber]); // When pageNumber changes

    return (
        <div className={`flex flex-col place-items-center mt-8 ${
            viewMode === "grid"
                ? "px-8 md:px-16 lg:px-32 xl:px-56"
                : "px-16 xl:px-24 lg:px-4 md:px-24 sm:px-24"
        }`}
        >
            <div
                className={`w-full gap-y-4  ${
                    viewMode === "grid"
                        ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        : "flex flex-col gap-y-6"
                }`}
            >
                {products.map((product) => (
                    viewMode === "grid" ? (
                        <ProductCardNoBorder 
                            key={product.id} 
                            product={product} 
                            onAddToCart={() => handleAddToCart(product)} />
                    ) : (
                        <ProductCardList 
                            key={product.id} 
                            product={product} 
                            onAddToCart={() => handleAddToCart(product)}/>
                    )
                ))}
            </div>

            <PaginationButton
                handleClick={handlePageChange}
                totalPages={totalPages}
                pageNumber={pageNumber}
            />
        </div>
    );
};


export default ListProducts;
