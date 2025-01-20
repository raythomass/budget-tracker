import React from 'react'
import { format } from 'date-fns'

export default function ExpenseSummary({ expenses }) {
  return (
    <div className='expense-summary'>
        <div className='flex justify-between mb-4'>
          <h2 className='mb-2'>Expense Summary</h2>
          <button className='p-2'>Add Expense</button>
        </div>
        {expenses.map((expense) => (
          <div key={expense} className='flex justify-between mb-4'>
            <div>
              <h4>{expense.description}</h4>
              <p>{format(new Date(expense.createdAt), "MM/dd/yyyy")}</p>
            </div>
            <div>
              <h4 className='summary-red'>- ${expense.amount}</h4>
            </div>
          </div>
        ))}
    </div>
  )
}
