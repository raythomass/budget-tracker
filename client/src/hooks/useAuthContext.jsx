import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//This makes sure a user is using context
export const useAuthContext = () => {
    //Have a const that signifies using the auth ocntext
    const context = useContext(AuthContext)

    //If there is no contect being used throw an error
    if(!context) {
        throw Error('useAuthContext must be used inside a AuthContextProvider')
    }

    //If context is used, return the context
    return context
}