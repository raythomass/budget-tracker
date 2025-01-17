import React from 'react'

export default function IncomeSummary({ incomes }) {
  return (
    <div className='income-summary p-8'>
        <h1>Income Summary</h1>
        {incomes.map((income) => (
            <p>{income.amount}</p>
        ))}
    </div>
  )
}
