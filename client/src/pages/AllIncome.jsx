import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useIncomeContext } from '../hooks/useIncomeContext'


//Try a state to equal the data from the expenses array
//The state should be uodated already and it shouldnt change from this page so the state should always update when this page is called
export default function AllIncome() {
  const { user } = useAuthContext()
  const { income, dispatch } = useIncomeContext()
  const [incomeData, setIncomeData] = useState([])

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch ('http://localhost:3001/api/expenses/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json)

      if(response) {
        setIncomeData(json.data)
      }
    }

    if(user) {
      fetchIncome()
    }
  }, [user, dispatch])

  return (
    <div>
      {incomeData && incomeData.map((incomes) => {
        <p>{incomes.amount}</p>
      })}
    </div>
  )
}
