import React, { useEffect } from 'react'

//Creating a function that takes expenses in as props
//Expenses is defined in Home.jsx when the componenent is added into the page
export default function ExpenseTotal({ expenses }) {
  //Expenses summary is going to take all the expenses gathered on Home.jsx and add them together for a total
  //.reduce() is a way to add up a total of an array
 const expenseSummary = expenses.reduce((total, expense) => total + expense.amount, 0);

 //Can change, but this is decalring the Expense Total, and then adding in the expenseSummary whcih added all the values
 //Output should look like "Expense Summary: $1200" or however much the total vlaue of the array comes out to
  return (
    <div>
        <h2>Expense Total: {expenseSummary}</h2>
    </div>
  )
}
