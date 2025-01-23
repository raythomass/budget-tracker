import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useExpenseContext } from '../hooks/useExpenseContext'
import { useAuthContext } from '../hooks/useAuthContext'

export default function CreateExpense() {
    const { dispatch } = useExpenseContext()
    const { user } = useAuthContext()

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const expense = {amount, description, category}

        const response = await fetch('http://localhost:3001/api/expenses/', {
            method: 'POST',
            body: JSON.stringify(expense),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = response.json()
        console.log(json)

        if(!response.ok) {
            setError(json.error)
            toast.error(json.error)
        }

        if(response.ok) {
            toast.success('New Expense Added')
            setAmount('')
            setDescription('')
            setCategory('')
            console.log('New Expense Created', json)
            dispatch({type: 'CREATE_EXPENSE', payload: json})
        }


    }



  return (
    <div className=' add-expense-div flex flex-col p-32'>
        <h1 className='mb-6'>Add an Expense</h1>
        <form onSubmit={handleSubmit}> 
            <div className='add-expense flex flex-col'>
                <label className='mb-2'>Amount:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Amount'
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
            </div>
            <div className='add-expense flex flex-col'>
                <label className='mb-2'>Description:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>
            <div className='add-expense flex flex-col'>
                <label className='mb-2'>Category:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Category'
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
            </div>
            <button>Add Expense</button>
        </form>
        {error ?? <div className='error'>{error}</div>}
    </div>
  )
}
