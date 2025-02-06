import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


//Try a state to equal the data from the expenses array
//The state should be uodated already and it shouldnt change from this page so the state should always update when this page is called
export default function AllExpenses() {
  const { user } = useAuthContext()
  const [expenseData, setExpenseData] = useState([])

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch ('http://localhost:3001/api/expenses/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json.data)

      if(response) {
        setExpenseData(json.data)
      }
    }

    if(user) {
      fetchExpenses()
    }
  }, [user])

  return (
    <div>
      {expenseData && expenseData.map((expense) => (
        <p key={expense._id}>{expense.description} {expense.amount}</p>
      ))}
    </div>
  )
}
