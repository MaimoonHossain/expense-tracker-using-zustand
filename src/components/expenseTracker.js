import React, { useState } from 'react';
import useExpenseStore from '../store/expense-store';
import ExpenseForm from './expenseForm';

function ExpenseTracker() {
  const { expenses, removeExpense, editExpense } = useExpenseStore();
  const [editMode, setEditMode] = useState(null);

  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

  console.log('current', expenses);

  const handleRemoveExpense = (id) => {
    removeExpense(id);
  };

  const handleEditExpense = (id) => {
    setEditMode(id);
  };

  const handleSaveExpense = (id, updatedExpense) => {
    console.log('hello');
    editExpense(id, updatedExpense);
    setEditMode(null);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl text-center font-bold mb-4'>
        Expense Tracker Using Zustand
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white p-4 rounded shadow'>
          {expenses.length > 0 ? (
            <h2 className='text-lg font-bold mb-4'>Expenses</h2>
          ) : (
            <h2 className='text-lg font-bold mb-4'>No expneses to show</h2>
          )}
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id} className='mb-2'>
                {editMode === expense.id ? (
                  <ExpenseForm
                    initialExpense={expense}
                    onSave={(updatedExpense) =>
                      handleSaveExpense(expense.id, updatedExpense)
                    }
                    onCancel={() => setEditMode(null)}
                  />
                ) : (
                  <>
                    <span className='mr-2'>{expense.description}</span>
                    <span>${expense.amount}</span>
                    <button
                      className='ml-2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded'
                      onClick={() => handleEditExpense(expense.id)}
                    >
                      Edit
                    </button>
                    <button
                      className='ml-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded'
                      onClick={() => handleRemoveExpense(expense.id)}
                    >
                      Remove
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className='bg-white p-4 rounded shadow'>
          <h2 className='text-lg font-bold mb-4'>Total</h2>
          <p className='text-2xl font-bold'>${total}</p>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;
