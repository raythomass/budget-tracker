import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//"Expenses" is taken in to be be used as stated in the homepage 
//Create a div inside the expenses.map so each user income will generate in the layout created
export default function ExpenseSummary({ expenses }) {

  return (
    <div className='expense-summary'>
        <div className='flex justify-between mb-4'>
            <div>
              <h4>{expenses.description}</h4>
              <p>{format(new Date(expenses.createdAt), "MM/dd/yyyy")}</p>
            </div>
            <div className='flex items-center gap-4'>
              <h4 className='summary-red'>${expenses.amount}</h4>
              <FontAwesomeIcon className='trash-icon' icon={faTrash} />
            </div>
          </div>
    </div>
  )
}


// const handleSubmit = async () => {
//   const expenseId = expenses._id
//   const response = await fetch(`http://localhost:3001/api/expenses/${expenseId}`, {
//     method: 'DELETE'

//   })
//  }
