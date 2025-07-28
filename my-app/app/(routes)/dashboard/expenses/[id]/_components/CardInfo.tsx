import { Item } from "dynamoose/dist/Item";
import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList }: { budgetList: budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    console.log(budgetList);
    budgetList && calCardInfo();
  }, [budgetList]);
  const calCardInfo = () => {
    let bud_tot = 0;
    let tot_spent = 0;
    budgetList.forEach((element: any) => {
      bud_tot = bud_tot + element.amount;
      tot_spent = tot_spent + element.totalSpent;
    });
    setTotalBudget(bud_tot);
    setTotalSpent(tot_spent);
    console.log(bud_tot, tot_spent);
  };
  return (
    <div>
      {budgetList.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="font-bold text-2xl">₹{totalBudget}</h2>
            </div>
            <PiggyBank className="bg-blue-600 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">Total spent</h2>
              <h2 className="font-bold text-2xl">₹{totalSpent}</h2>
            </div>
            <ReceiptText className="bg-blue-600 p-3 h-12 w-12 rounded-full text-white" />
          </div>
          <div className="p-7 border rounded-lg flex items-center justify-between">
            <div>
              <h2 className="text-sm">No of Budget</h2>
              <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
            </div>
            <Wallet className="bg-blue-600 p-3 h-12 w-12 rounded-full text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div className="h-[120px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
