import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2"
import ExpenseTotal from "../components/ExpenseTotal";
import IncomeTotal from "../components/IncomeTotal";
import ExpenseSummary from "../components/ExpenseSummary";
import IncomeSummary from "../components/IncomeSummary";
import { useExpenseContext } from "../hooks/useExpenseContext"
import { useIncomeContext } from "../hooks/useIncomeContext"
import AmountDifference from "../components/AmountDifference"

defaults.maintainAspectRatio = false;
defaults.responsive = true;


export default function Home() {
  //Grab user from context
  const { user } = useAuthContext()
  const { expenses, dispatch: expenseDispatch } = useExpenseContext()
  const { income, dispatch: incomeDispatch} = useIncomeContext()
  //Create states for user, expense, and income data
  const [userData, setUserData] = useState({})

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
        // setUserExpenses(json.user.expenses)
        expenseDispatch({type: "SET_EXPENSES", payload: json.user.expenses})
        incomeDispatch({type: "SET_INCOME", payload: json.user.income})
      } catch (error) {
        console.log({error: error.message})
      }

      }
      //if there is a user, run the fetch user function to grab the user's data
      if (user) {
        fetchUser()
    }
  },[user, expenseDispatch, incomeDispatch])

  return (
    <div>
        <h2 className="">Welcome, {userData.name}</h2>

        <div className="donut-totals-div flex justify-between p-4">
          <div className="donut-chart-div p-4">
          <Doughnut
            className="donut"
              data={{
                labels: income && income.map((incomes) => incomes.category),
                datasets: [{
                  data: income && income.map((incomes) => incomes.amount),
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
          <div className="donut-chart-div p-4">
            <Doughnut
            className="donut"
              data={{
                labels: expenses && expenses.map((expense) => expense.category),
                datasets: [{
                  data: expenses && expenses.map((expense) => expense.amount),
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
        </div>

        <div className="summaries flex p-4 pt-0 gap-4">
          <div className="income-summary-div p-4">
            <div className='flex justify-between mb-4'>
              <h2 className='mb-2'>Income Summary</h2>
              <Link to={'/createIncome'}>
                <button className='p-2'>Add Income</button>
              </Link>
            </div>
            {income && income.slice(0,4).map((incomes) => (
              <IncomeSummary key={incomes._id} income={incomes}/>
            ))}
          </div>
          <div className="expense-summary-div p-4">
            <div className='flex justify-between mb-4'>
              <h2 className='mb-2'>Expense Summary</h2>
              <Link to={'/createExpense'}>
                <button className='p-2'>Add Expense</button>
              </Link>
            </div>
            {expenses && expenses.slice(0,4).map((expense) => (
              <ExpenseSummary key={expense._id} expenses={expense}/>
            ))}
          </div>
          <div className="totals-div p-4">
            <IncomeTotal incomes={income}/>
            <ExpenseTotal expenses={expenses}/>
            <AmountDifference expenses={expenses} income={income}/>
          </div>
        </div>
    </div>
  )
}
