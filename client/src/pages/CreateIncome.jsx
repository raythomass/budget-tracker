import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuthContext } from '../hooks/useAuthContext'

export default function CreateIncome() {
    const navigate = useNavigate()

    const { user } = useAuthContext()

    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [source, setSource] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user) {
            setError('You must be logged in')
            return
        }

        const income = {amount, description, source}

        const response = await fetch('http://localhost:3001/api/income/', {
            method: 'POST',
            body: JSON.stringify(income),
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
            toast.success('New Income Added')
            setAmount('')
            setDescription('')
            setSource('')
            console.log('New Income Created', json)
            navigate('/')
        }


    }



  return (
    <div className=' add-income-div flex flex-col p-32'>
        <h1 className='mb-6'>Add an Income</h1>
        <form onSubmit={handleSubmit}> 
            <div className='add-income flex flex-col'>
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
                <label className='mb-2'>Source:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Category'
                    onChange={(e) => setSource(e.target.value)}
                    value={source}
                />
            </div>
            <button>Add Income</button>
        </form>
        {error ?? <div className='error'>{error}</div>}
    </div>
  )
}