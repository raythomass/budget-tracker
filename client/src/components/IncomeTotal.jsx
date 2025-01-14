import React, { useEffect } from 'react'

export default function IncomeTotal({ incomes }) {
 const incomeSummary = incomes.reduce((total, income) => total + income.amount, 0);

  return (
    <div>
        <h1>Income Total: {incomeSummary}</h1>
    </div>
  )
}
