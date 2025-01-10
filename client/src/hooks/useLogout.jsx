import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    //Grab dispatch reducers from the auth context to be used 
    const { dispatch } = useAuthContext()
    //Create a logout function ot be used similar to mongoose statics
    //Remove the user item form the local storage
    //Dispatch the Logout function 
    const logout = async () => {
        localStorage.removeItem('user')

        dispatch({type: "LOGOUT"})
    }
    //return the logout funcation to be used
    return {logout}
}