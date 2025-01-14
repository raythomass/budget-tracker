import React, { useEffect } from 'react'

export default function ExpenseTotal({ expenses }) {
 const expenseSummary = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div>
        <h1>Expense Total: {expenseSummary}</h1>
    </div>
  )
}
