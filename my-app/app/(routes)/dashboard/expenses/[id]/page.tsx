"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseList from "./_components/ExpenseList";
import { use } from "react";

type ExpenseParams = {
  id: string;
};
function Expenses({ params }: { params: Promise<ExpenseParams> }) {
  const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const { id } = use(params);
  console.log("this is one expe", id);
  useEffect(() => {
    fetchBudgets();
    GetExpenseList();
  }, [params]);

  const GetExpenseList = async () => {
    try {
      const userid = getCookie("userid");
      const res = await fetch(`/api/expense?userId=${userid}&budgetId=${id}`);
      const json = await res.json();
      console.log("list of expe", json);
      setExpenseList(json.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchBudgets = async () => {
    try {
      const userid = getCookie("userid");
      const res = await fetch(
        `/api/SingleBudgetInfo?userId=${userid}&expenseId=${id}`
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
        <AddExpense BudgetId={id} onExpenseAdded={fetchBudgets} />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">All Your Expenses</h2>
        <ExpenseList expenses={expenseList} />
      </div>
    </div>
  );
}

export default Expenses;
