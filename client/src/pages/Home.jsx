import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"
import ExpenseTotal from "../components/ExpenseTotal";
import IncomeTotal from "../components/IncomeTotal";

defaults.maintainAspectRatio = false;
defaults.responsive = true;


export default function Home() {
  //Grab user from context
  const { user } = useAuthContext()
  //Create states for user, expense, and income data
  const [userData, setUserData] = useState({})
  const [userExpenses, setUserExpenses] = useState([])
  const [userIncome, setUserIncome] = useState([])

  useEffect(() => {
    //Fetch user to be all to use all user data 
    const fetchUser = async () => {
      try {
        //Fetch user data from endpoint
        //Authorize it by using the token in the user context
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
        <h2 className="text-center m-6">Welcome, {userData.name}</h2>
        <div className="doughnut-chart flex">
          <Doughnut
          className="doughnut"
            data={{
              labels: userExpenses.map((expense) => expense.category),
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
          <div className="p-8">
            <h2>Income:</h2>
            {userIncome.map((income) => (
              <>
              <p>${income.amount}</p>
              </>
            ))}
          </div>
        </div>
        <ExpenseTotal expenses={userExpenses}/>
        <IncomeTotal incomes={userIncome}/>
    </div>
  )
}



{/* <Doughnut
        className="doughnut"
          data={{
            labels: userIncome.map((income) => income.source),
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
        /> */}
