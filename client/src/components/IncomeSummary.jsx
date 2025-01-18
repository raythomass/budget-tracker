import React from 'react'

export default function IncomeSummary({ incomes }) {
  return (
    <div className='income-summary'>
        <h2 className='mb-2'>Income Summary</h2>
        {incomes.map((income) => (
          <div key={income} className='flex flex-col mb-4'>
            <h4>{income.description}</h4>
            <p>{income.category}</p>
          </div>

        ))}
    </div>
  )
}
