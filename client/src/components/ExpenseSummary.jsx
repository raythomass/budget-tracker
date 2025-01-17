import React from 'react'

export default function ExpenseSummary({ expenses }) {
  return (
    <div className='expense-summary p-8'>
        <h1>Expense Summary</h1>
        {expenses.map((expense) => (
            <p>{expense.amount}</p>
        ))}
    </div>
  )
}
