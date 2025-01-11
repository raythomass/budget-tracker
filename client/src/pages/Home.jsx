import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"

defaults.maintainAspectRatio = false;
defaults.responsive = true;


export default function Home() {
  const { user } = useAuthContext()
  const [userData, setUserData] = useState({})
  const [userExpenses, setUserExpenses] = useState([])
  const [userIncome, setUserIncome] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/data', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json()
        setUserData(json.user)
        setUserExpenses(json.user.expenses)
        setUserIncome(json.user.income)
      } catch (error) {
        console.log({error: error.message})
      }

      }

      if (user) {
        fetchUser()
    }
  },[user])

  return (
    <div>
        <p>Welcome, {userData.name}</p>
        <div className="doughnut-chart flex">
        <Doughnut
        className="doughnut"
          data={{
            datasets: [{
              data: userExpenses.map((expenses) => expenses.amount),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40"
              ]
            }]
          }}
          options={{
            plugins:{
              title:{
                text: "Expenses",
                display: true,
                font: {
                  size: 20
                }
              }
            }
          }}
        />
        <Doughnut
        className="doughnut"
          data={{
            datasets: [{
              data: userIncome.map((income) => income.amount),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40"
              ]
            }]
          }}
          options={{
            plugins:{
              title:{
                text: "Income",
                display: true,
                font: {
                  size: 20
                }
              }
            }
          }}
        />
        </div>
    </div>
  )
}
