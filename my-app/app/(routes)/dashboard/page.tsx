"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import CardInfo from "./expenses/[id]/_components/CardInfo";
import BarChart from "./expenses/[id]/_components/BarChartDash";
import BarChartDash from "./expenses/[id]/_components/BarChartDash";
import { Budget } from "@/models/models";
import BudgetList from "./budgets/_components/BudgetList";
import BudgetItem from "./budgets/_components/BudgetItem";

function page() {
  const username = getCookie("username");
  console.log("this si usn", username);
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
    <div className="p-8">
      <h2 className="font-bold text-3xl">Hi {username}</h2>
      <p className="text-gray-600">Here's What's Happening to Your Money</p>
      <CardInfo budgetList={budgetList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDash budgetList={budgetList} />
        </div>
        <div className="gap-2">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
