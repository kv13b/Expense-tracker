"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { getCookie } from "cookies-next/client";
import { json } from "stream/consumers";
import BudgetItem from "./BudgetItem";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const userid = getCookie("userid");

  useEffect(() => {
    fetchBudgets();
  }, [userid]);
  const fetchBudgets = async () => {
    try {
      const res = await fetch(`/api/budget?userId=${userid}`);
      const json = await res.json();
      console.log("data ", json.data);
      if (json.data) setBudgetList(json.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CreateBudget refreshData={() => fetchBudgets()} />
        {budgetList.length > 0
          ? budgetList.map((budget) => (
              <BudgetItem key={budget.expenseId} budget={budget} />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
