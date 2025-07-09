type ExpenseItem = {
  date: string;
  name: string;
  amount: string;
};

const ExpenseList = ({ expenses }: { expenses: ExpenseItem[] }) => {
  return (
    <div className="mt-3">
      <div className="grid grid-cols-3 bg-slate-200 p-2">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
      </div>
      {expenses.map((expense, index) => (
        <div key={index} className="grid grid-cols-3 bg-slate-400 p-2">
          <h2>{expense.name}</h2>
          <h2>{expense.name}</h2>
          <h2>{expense.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
