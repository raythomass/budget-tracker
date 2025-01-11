import { createContext, useReducer, useEffect } from "react";

//Creating a const named AuthContext that creates a context
export const AuthContext = createContext()

//Creating authReducer to hold the cases we want to use
//Take in a state and an action
export const authReducer = (state, action) => {
    //Switch the action type
    switch (action.type) {
        //In the case of a login, return the user as the action payload
        case 'LOGIN':
            return { user: action.payload }
        //In the case of logging out,return the user as null
        case 'LOGOUT':
            return { user: null }
        //The default is the current state
        default:
            return state
    }
}

//Create the auth context provider that has children
export const AuthContextProvider = ({ children }) => {
    //Designate state and dispatch taking in the authreducer
    //Set the user to null to start
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        //Grab the user from localstorage
        const user = JSON.parse(localStorage.getItem('user'))

        //If there is no user then return the login case
        if(user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    //Show the current state of auth context
    console.log('AuthContext state: ', state)

    //Return the provider with that state and dispatch and takes the children
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

