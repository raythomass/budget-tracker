import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

//"Incomes" is taken in to be be used as stated in the homepage 
//Create a div inside the incomes.map so each user income will generate in the layout created
export default function IncomeSummary({ income }) {

  return (
    <div className='income-summary'>
    <div className='flex justify-between mb-4'>
        <div>
          <h4>{income.description}</h4>
          <p>{format(new Date(income.createdAt), "MM/dd/yyyy")}</p>
        </div>
        <div className='flex items-center gap-4'>
          <h4 className='summary-green'>${income.amount}</h4>
          <FontAwesomeIcon className='trash-icon' icon={faTrash} />
        </div>
      </div>
</div>
  )
}
