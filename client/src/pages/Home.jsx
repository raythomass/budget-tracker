import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"
import ExpenseTotal from "../components/ExpenseTotal";
import IncomeTotal from "../components/IncomeTotal";
import ExpenseSummary from "../components/ExpenseSummary";
import IncomeSummary from "../components/IncomeSummary";

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
        //Set user data, expenses, and income
        setUserData(json.user)
        setUserExpenses(json.user.expenses)
        setUserIncome(json.user.income)
      } catch (error) {
        console.log({error: error.message})
      }

      }
      //if there is a user, run the fetch user function to grab the user's data
      if (user) {
        fetchUser()
    }
  },[user])

  return (
    <div>
        <h2 className="">Welcome, {userData.name}</h2>
        <div className="donut-totals-div flex">
          <div className="donut-chart-div p-4">
            <Doughnut
            className="donut"
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
                    text: "Total Expenses",
                    display: true,
                    font: {
                      size: 20
                    }
                  }
                }
              }}
            />
          </div>
          <div className="donut-chart-div p-4">
          <Doughnut
            className="donut"
              data={{
                labels: userIncome.map((income) => income.category),
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
                    text: "Total Income",
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
        <div className="summaries flex">
          <div className="expense-summary-div p-4">
              <ExpenseSummary expenses={userExpenses}/>
          </div>
          <div className="income-summary-div p-4">
            <IncomeSummary incomes={userIncome}/>
          </div>
          <div className="totals-div">
            <ExpenseTotal expenses={userExpenses}/>
            <IncomeTotal incomes={userIncome}/>
        </div>
        </div>
    </div>
  )
}
