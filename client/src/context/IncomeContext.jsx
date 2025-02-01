import { createContext, useReducer } from "react";
//Create a use of context called income context
export const IncomeContext = createContext();
//Create an income reducer with a state and action
//Start with switching the action types
//Set cases based on what should happen
export const incomeReducer = ( state, action ) => {
    switch ( action.type ) {
        //Setting income should set the income
        //action payload will update the income category
        case "SET_INCOME":
            return {
                income: action.payload
            }
        //Create income is for creating an income in the app
        //income will update with the action payload as well as that income in the state already
        case "CREATE_INCOME":
            return {
                income: [action.payload, ...state.income]
            }
        //Delete income will delete a targeted income
        //Take the state expenincomeses and filter them
        //The function takes in e which would be the event of clicking an income, then the _id of that does not equal the action payload id
        case "DELETE_INCOME":
            return {
                income: state.income.filter((i) => i._id !== action.payload._id)
            }
        //If nothing else return the state
        default:
            return state
    }
}
//Export a provider that has children
export const IncomeContextProvider = ({ children }) => {
    //Make a const array of state and dispatch that will use the income reducers with income being null at first
    const [state, dispatch] = useReducer(incomeReducer, {
        income: null
    })
    //Return the provider with the state and dispatch values with the children inside it
    //This will allow the state to be added to main.jsx and apply to everything within it
    return (
        <IncomeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </IncomeContext.Provider>
    )
}