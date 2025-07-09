import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCookie } from "cookies-next/client";
import React, { useState } from "react";
import { toast } from "sonner";
function AddExpense({
  BudgetId,
  onExpenseAdded,
}: {
  BudgetId: string;
  onExpenseAdded: () => void;
}) {
  const [Name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const userid = getCookie("userid");
    const data = {
      userid,
      Name,
      amount: parseFloat(amount),
      BudgetId: BudgetId,
    };
    try {
      const response = await fetch("/api/SingleBudgetInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast(errorData.error || "Failed to create Expense");
        return;
      }
      setName("");
      setAmount("");
      toast("Expense created successfully");
      onExpenseAdded();
    } catch (error) {
      console.error("Expense creation error:", error);
      toast("An error occurred while creating Expense");
    }
  };

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
            onKeyDown={(e) => {
              if (e.key === "Enter" && Name && amount) {
                handleSubmit(e);
              }
            }}
          />
        </div>
      </div>
      <Button
        disabled={!(Name && amount)}
        className="mt-3 w-full"
        onClick={handleSubmit}
      >
        Add Expense
      </Button>
    </div>
  );
}

export default AddExpense;
