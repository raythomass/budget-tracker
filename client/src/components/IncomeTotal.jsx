import React, { useEffect } from 'react'

//Creating a function that takes incomes in as props
//Incomes is defined in Home.jsx when the componenent is added into the page
export default function IncomeTotal({ incomes }) {
  //Income summary is going to take all the income gathered on Home.jsx and add them together for a total
  //.reduce() is a way to add up a total of an array
 const incomeSummary = incomes.reduce((total, income) => total + income.amount, 0);

  //Can change, but this is decalring the Income Total, and then adding in the incomeSummary whcih added all the values
 //Output should look like "Income Summary: $900" or however much the total vlaue of the array comes out to
  return (
    <div>
        <h2>Income Total: {incomeSummary}</h2>
    </div>
  )
}
