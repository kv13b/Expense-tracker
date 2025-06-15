import BudgetList from "./_components/BudgetList";

function Budget() {
  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My budgets</h2>
      <BudgetList />
    </div>
  );
}

export default Budget;
