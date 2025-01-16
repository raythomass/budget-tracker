import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import toast from "react-hot-toast"

//Creating a hook to use for signing up
export const useSignup = () => {
    //Create a state for error and loading to be used in the signup page
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    //Pull in dispatch from auth context so we can dispatch the actions created previously
    const { dispatch } = useAuthContext()

    //signup function that takes in a name, email, and password
    //required by the signup static in the user model
    const signup = async (name, email, password) => {
        //set the states to null to start
        setIsLoading(true)
        setError(null)
        //fetch API from backend route for signing up
        //Method is POST and the body needs to stringify the variables added in by the user
        const response = await fetch('https://budget-tracker-izau.onrender.com//api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, email, password})
        })
        //Turn the api call to json
        const json = await response.json()
        //if the api call is not ok, set the states to error out
        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            toast.error(json.error)
        }
        //if the repsonse is ok, create a localstorage item called 'user' that stringifies the json from the api call
        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            //after the local item is created, dispatch the login function created in the auth context
            //set the payload to the json variable that holds the api call data
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            toast.success('Signup Successful')
        }
    }
    //return the signup function, and the created states to be used in the signup page
    return { signup, isLoading, error}
}
