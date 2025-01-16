import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import toast from "react-hot-toast"

export const useLogin = () => {
    //Set states for error and isLoading
    //Get dispatch from auth context to dispatch reducers created previosuly
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    //Fubction calledlogin that will be used in the login pages
    //Similar to statics on mongoose models
    const login = async (email, password) => {
        //Default state for error is null so error is wiped clean with each login
        //isLoaond starts as true until is changed by the login being ok
        setIsLoading(true)
        setError(null)
        //Create a post request named response to the login route
        //POST route because the forms will be posting the information to the route 
        const response = await fetch('https://budget-tracker-izau.onrender.com//api/users/login', {
            //Define Post as method
            method: 'POST',
            //Define headers as content-type and then specify appplication/json
            headers: {'Content-Type': 'application/json'},
            //Define the body as being the email and password entered to login and then stringify it
            body: JSON.stringify({email, password})
        })
        //Turn the fetch requst into json
        const json = await response.json()
        //Check if the response is ok
        //If not, isLaoding changes to false, and then set the error to the value given by the request
        //Toast is optional but will notify the user with the content of the error given
        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            toast.error(json.error)
        }
        //If the repsonse is ok
        //Set a user item to thelocal storage and stringy the json variable created as the data
        //Dispatch the login function and the payload is the json variable,matching the local storage item
        //Set isloading to false, error to null since the user is logged in and toast a succes mesage
        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            setError(null)
            toast.success('Login Successful')
        }
    }
    //Return the login funcation as well as the states created for use in the login page
    return {login, error, isLoading}
}
