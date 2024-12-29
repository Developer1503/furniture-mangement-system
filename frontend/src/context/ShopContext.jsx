import { createContext } from "react";
import { products } from "../assets/assets";

const ShopContextProvider = (props) => {

    const value = {

    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}

export default ShopContextProvider;

