import React from 'react'

export default function AmountDifference({expenses, income}) {
    const expenseSummary = expenses && expenses.reduce((total, expense) => total + expense.amount, 0);
    const incomeSummary = income && income.reduce((total, income) => total + income.amount, 0);
    const difference = incomeSummary - expenseSummary
  return (
    <h2>Total Monetary Difference: {difference}</h2>
  )
}
