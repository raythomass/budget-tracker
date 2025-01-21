import React from 'react'

export default function CreateExpense() {
  return (
    <div className=' add-expense-div flex flex-col  p-32'>
        <h1 className='mb-6'>Add an Expense</h1>
        <form>
            <div className='add-expense flex flex-col'>
                <label className='mb-2'>Amount:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Amount'
                />
            </div>
            <div className='add-expense flex flex-col'>
                <label className='mb-2'>Description:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Description'
                />
            </div>
            <div className='add-expense flex flex-col'>
                <label className='mb-2'>Category:</label>
                <input
                    className='mb-4 p-2'
                    type='text'
                    placeholder='Category'
                />
            </div>
        </form>
    </div>
  )
}
