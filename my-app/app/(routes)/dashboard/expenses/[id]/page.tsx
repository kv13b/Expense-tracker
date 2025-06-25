"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "./_components/AddExpense";
type Expense = {
  id: string;
};
function Expenses({ params }: { params: Expense }) {
  const [budgetList, setBudgetList] = useState([]);
  console.log("this is one expe", params.id);
  useEffect(() => {
    fetchBudgets();
  }, [params]);
  const fetchBudgets = async () => {
    try {
      const userid = getCookie("userid");
      const res = await fetch(
        `/api/SingleBudgetInfo?userId=${userid}&expenseId=${params.id}`
      );
      const json = await res.json();
      setBudgetList(json.data);
      console.log("data of expense", json.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expense</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetList ? (
          <BudgetItem budget={budgetList} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense BudgetId={params.id} />
      </div>
    </div>
  );
}

export default Expenses;
