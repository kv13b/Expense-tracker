import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
type BudgetId = {
  id: string;
};
function AddExpense({ BudgetId }: { BudgetId: BudgetId }) {
  const [Name, setName] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <div className="my-2">
          <h2 className="text-black font-medium my-1">Expense Name</h2>
          <Input
            placeholder="Ex:Monthly Expense"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-2">
          <h2 className="text-black font-medium my-1">Expense Amount</h2>
          <Input
            placeholder="Ex:₹6000"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
      <Button disabled={!(Name && amount)} className="mt-3 w-full">
        Add Expense
      </Button>
    </div>
  );
}

export default AddExpense;
