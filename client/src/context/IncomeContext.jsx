import { createContext, useReducer } from "react";

export const IncomeContext = createContext();


export const incomeReducer = ( state, action ) => {
    switch ( action.type ) {
        case "SET_INCOME":
            return {
                expenses: action.payload
            }
        case "CREATE_INCOME":
            return {
                expenses: [action.payload, ...state.expenses]
            }
        case "DELETE_INCOME":
            return {
                expenses: state.expenses.filter((e) => e._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const IncomeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(incomeReducer, {
        expenses: null
    })

    return (
        <IncomeContext.Provider value={{ ...state, dispatch }}>
            {children}
        </IncomeContext.Provider>
    )
}