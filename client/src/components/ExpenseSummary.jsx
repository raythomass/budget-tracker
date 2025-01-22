import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

//"Expenses" is taken in to be be used as stated in the homepage 
//Create a div inside the expenses.map so each user income will generate in the layout created
export default function ExpenseSummary({ expenses }) {
  return (
    <div className='expense-summary'>
        <div className='flex justify-between mb-4'>
          <h2 className='mb-2'>Expense Summary</h2>
          <Link to={'/createExpense'}>
            <button className='p-2'>Add Expense</button>
          </Link>
        </div>
        {expenses.slice(0,4).map((expense) => (
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
