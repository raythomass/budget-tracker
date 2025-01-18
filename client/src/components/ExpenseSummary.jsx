import React from 'react'

export default function ExpenseSummary({ expenses }) {
  return (
    <div className='expense-summary'>
        <h2 className='mb-2'>Expense Summary</h2>
        {expenses.map((expense) => (
          <div key={expense} className='flex flex-col mb-4'>
            <h4>{expense.description}</h4>
            <p>{expense.category}</p>
          </div>

        ))}
    </div>
  )
}
