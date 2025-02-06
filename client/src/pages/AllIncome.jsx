import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'


//Try a state to equal the data from the expenses array
//The state should be uodated already and it shouldnt change from this page so the state should always update when this page is called
export default function AllIncome() {
  const { user } = useAuthContext()
  const [incomeData, setIncomeData] = useState([])

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch ('http://localhost:3001/api/income/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      console.log(json.data)

      if(response) {
        setIncomeData(json.data)
      }
    }

    if(user) {
      fetchIncome()
    }
  }, [user])

  return (
    <div>
      {incomeData && incomeData.map((incomes) => (
        <p key={incomes._id}>{incomes.description} {incomes.amount}</p>
      ))}
    </div>
  )
}
