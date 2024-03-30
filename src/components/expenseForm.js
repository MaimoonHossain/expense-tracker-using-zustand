import React, { useState } from 'react';
import useExpenseStore from '../store/expense-store';

const ExpenseForm = ({ initialExpense, onSave, onCancel }) => {
  // if there is a initalExpense, set the description and amount to the initialExpense values
  const [description, setDescription] = useState(
    initialExpense ? initialExpense.description : ''
  );
  const [amount, setAmount] = useState(
    initialExpense ? initialExpense.amount.toString() : ''
  );
  const { addExpense, editExpense } = useExpenseStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) return;

    if (initialExpense) {
      const updatedExpense = {
        description,
        amount: parseFloat(amount),
      };

      editExpense(initialExpense.id, updatedExpense);

      onSave(updatedExpense);
      return;
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };

    addExpense(newExpense);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 max-w-md mx-auto'>
      <div className='flex flex-col space-y-4'>
        <input
          type='text'
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
        />
        <input
          type='number'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
        />
        <div className='flex space-x-2'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          >
            {initialExpense ? 'Save Changes' : 'Add Expense'}
          </button>
          {onCancel && (
            <button
              type='button'
              onClick={onCancel}
              className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded'
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
