import { format, isValid } from 'date-fns'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../hooks/useAuthContext'
import { useIncomeContext } from '../hooks/useIncomeContext'
import { useState } from 'react'

//"Incomes" is taken in to be be used as stated in the homepage 
//Create a div inside the incomes.map so each user income will generate in the layout created
export default function IncomeSummary({ income }) {

  const { user } = useAuthContext()
  const { dispatch } = useIncomeContext()
  const [error, setError] = useState(null)

  const date = new Date(income.createdAt); // Convert to Date object
  const formattedDate = isValid(date) ? format(date, "MM/dd/yyyy") : "Invalid Date";

  const handleClick = async () => {
    const incomeId = income._id
    const response = await fetch(`http://localhost:3001/api/income/${incomeId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
      toast.error(error)
    } 
    if(response.ok) {
      toast.success('Income Deleted')
      dispatch({type: "DELETE_INCOME", payload: json})
    }
  }


  return (
    <div className='income-summary'>
    <div className='flex justify-between mb-4'>
        <div>
          <h4>{income.description}</h4>
          <p>{formattedDate}</p>
        </div>
        <div className='flex items-center gap-4'>
          <h4 className='summary-green'>${income.amount}</h4>
          <FontAwesomeIcon onClick={handleClick} className='trash-icon' icon={faTrash} />
        </div>
      </div>
</div>
  )
}
