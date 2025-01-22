import React from 'react'
import { format } from 'date-fns'

//"Incomes" is taken in to be be used as stated in the homepage 
//Create a div inside the incomes.map so each user income will generate in the layout created
export default function IncomeSummary({ incomes }) {
  return (
    <div className='income-summary'>
        <div className='flex justify-between mb-4'>
          <h2 className='mb-2'>Income Summary</h2>
          <button className='p-2'>Add Income</button>
        </div>
        {incomes.map((income) => (
          <div key={income} className='flex justify-between mb-4'>
          <div>
            <h4>{income.description}</h4>
            <p>{format(new Date(income.createdAt), "MM/dd/yyyy")}</p>
          </div>
          <div>
            <h4 className='summary-green'>${income.amount}</h4>
          </div>
        </div>
        ))}
    </div>
  )
}
