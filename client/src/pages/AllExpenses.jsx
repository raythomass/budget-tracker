import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { format, isValid } from 'date-fns'


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
    <div className='all-expenses-container' >
          <h1>All Income</h1>
          {expenseData && expenseData.map((expense) => (
            <div className='all-expenses-data flex'>
              <div className='all-expenses-description'>
                <h2>{expense.description}</h2>
                <p>{format(expense.createdAt, "MM/dd/yyyy")}</p>
              </div>
              <h2 className='summary-red'>-${expense.amount}</h2>
            </div>
          ))}
        </div>
  )
}
