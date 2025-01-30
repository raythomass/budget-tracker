import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useIncomeContext } from '../hooks/useIncomeContext'

export default function AllIncome() {
  const { user } = useAuthContext()
  const { income, dispatch } = useIncomeContext()

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch ('http://localhost:3001/api/expenses/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if(response) {
        dispatch({type: "SET_INCOME", payload: json})
      }
    }

    if(user) {
      fetchIncome()
    }
  }, [user, dispatch])

  return (
    <div>
      <h1>All Income</h1>
    </div>
  )
}
