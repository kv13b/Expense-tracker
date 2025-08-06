"use client";
import { getCookie } from "cookies-next/client";
import React, { useEffect, useState } from "react";
import ExpenseList from "../expenses/[id]/_components/ExpenseList";

function Expense() {
  const userid = getCookie("userid");
  const [expenseList, setExpenseList] = useState([]);
  useEffect(() => {
    if (userid) fetchExpenses();
  }, [userid]);
  const fetchExpenses = async () => {
    try {
      const res = await fetch(`/api/registers?userId=${userid}`);
      const json = await res.json();
      console.log(json);
      if (json.data) {
        setExpenseList(json.data);
      }
    } catch (err) {
      console.error("Error fetching budgets:", err);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg">All Your Expenses</h2>
      {/* <ExpenseList
        expenses={expenseList}
        onLoad={fetchBudgets}
        RefreshExpense={GetExpenseList}
      /> */}
    </div>
  );
}

export default Expense;
