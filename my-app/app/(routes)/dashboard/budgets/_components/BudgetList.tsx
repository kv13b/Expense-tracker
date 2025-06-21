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
    fetchBudgets();
  }, [userid]);
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <CreateBudget />
        {budgetList.map((budget) => (
          <BudgetItem key={budget.expenseId} budget={budget} />
        ))}
      </div>
    </div>
  );
}

export default BudgetList;
