import { format, isValid } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../hooks/useAuthContext'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useState } from 'react'

//"Expenses" is taken in to be be used as stated in the homepage 
//Create a div inside the expenses.map so each user income will generate in the layout created
export default function ExpenseSummary({ expenses }) {
  const { user } = useAuthContext()
  const { dispatch } = useExpenseContext()
  const [error, setError] = useState(null)

  const date = new Date(expenses.createdAt); // Convert to Date object
  const formattedDate = isValid(date) ? format(date, "MM/dd/yyyy") : "Invalid Date";

  //All expenses are mapped over in the Home.jsx so getting expenseId will target which one is clicked
  //Fetch the delete expense route
  const handleClick = async () => {
    const expenseId = expenses._id
    const response = await fetch(`http://localhost:3001/api/expenses/${expenseId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
      toast.error(error)
    } 
    //If response is ok then throw a success message and update the expense state
    if(response.ok) {
      toast.success('Expense Deleted')
      dispatch({type: "DELETE_EXPENSE", payload: json})
    }

   }



  return (
    <div className='expense-summary'>
        <div className='flex justify-between mb-4'>
            <div>
              <h4>{expenses.description}</h4>
              {/* <p>{format(new Date(expenses.createdAt), "MM/dd/yyyy")}</p> */}
              <p>{formattedDate}</p>
              
            </div>
            <div className='flex items-center gap-4'>
              <h4 className='summary-red'>${expenses.amount}</h4>
              <FontAwesomeIcon onClick={handleClick} className='trash-icon' icon={faTrash} />
            </div>
          </div>
    </div>
  )
}

