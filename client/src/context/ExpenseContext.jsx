import { createContext, useReducer } from "react";

//Create a use of context called expense context
export const ExpenseContext = createContext();
//Create an expense reducer with a state and action
//Start with switching the action types
//Set cases based on what should happen
export const expenseReducer = ( state, action ) => {
    switch ( action.type ) {
        //Setting expenses should set the expenses
        //action payload will update ther expenses category
        case "SET_EXPENSES":
            return {
                expenses: action.payload
            }
        //Create expenses is for creating an expense in the app
        //Expenses will update with the action payload as well as that expenses in the state already
        case "CREATE_EXPENSE":
            return {
                expenses: [action.payload, ...state.expenses]
            }
        //Delete expense will delete a targeted expense
        //Take the state expenses and filter them
        //The function takes in e which would be the event of clicking an expense, then the _id of that does not equal the action payload id
        case "DELETE_EXPENSE":
            return {
                expenses: state.expenses.filter((e) => e._id !== action.payload._id)
            }
        //If nothing else return the state
        default:
            return state
    }
}
//Export a provider that has children
export const ExpenseContextProvider = ({ children }) => {
    //Make a const array of state and dispatch that will use the expense reducers with expenses being null at first
    const [state, dispatch] = useReducer(expenseReducer, {
        expenses: null
    })

    //Return the provider with the state and dispatch values with the children inside it
    //This will allow the state to be added to main.jsx and apply to everything within it
    return (
        <ExpenseContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ExpenseContext.Provider>
    )
}