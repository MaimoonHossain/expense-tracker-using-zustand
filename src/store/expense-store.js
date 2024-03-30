import { create } from 'zustand';

const useExpenseStore = create((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
  editExpense: (id, updatedExpense) =>
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? updatedExpense : expense
      ),
    })),
  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),
}));

export default useExpenseStore;
