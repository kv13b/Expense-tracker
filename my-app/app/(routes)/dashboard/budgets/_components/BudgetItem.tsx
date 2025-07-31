import Link from "next/link";
import React from "react";

type Budget = {
  icon: string;
  name: string;
  amount: string;
  expenseId: string;
  totalSpent: string;
};
function BudgetItem({ budget }: { budget: Budget }) {
  console.log("in bg itme", budget);
  return (
    <Link href={"/dashboard/expenses/" + budget.expenseId}>
      <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 item-center justify-between">
          <div className="flex gap-2 item-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {budget.icon}
            </h2>
            <div className="font-bold">{budget.name}</div>
          </div>
          <h2 className="font-bold text-primary text-lg">₹{budget.amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">₹{budget.totalSpent}</h2>
            <h2 className="text-xs text-slate-400">₹{budget.amount}</h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{
                width: `${Math.min(
                  (Number(budget.totalSpent) / Number(budget.amount)) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
