import React from "react";

type Budget = {
  icon: string;
  name: string;
  amount: string;
};
function BudgetItem({ budget }: { budget: Budget }) {
  console.log("in bgitme", budget);
  return (
    <div className="p-5 border rounded-lg hover:shadow-md cursor-pointer">
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
          <h2 className="text-xs text-slate-400">₹0</h2>
          <h2 className="text-xs text-slate-400">₹0</h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div className="w-[40%] bg-primary h-2 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default BudgetItem;
