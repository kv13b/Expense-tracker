"use client";
import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next/client";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseList from "./_components/ExpenseList";
import { use } from "react";
import { PenBox, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "./_components/EditBudget";
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
  const deleteBudget = async () => {
    try {
      const userId = getCookie("userid");
      const res = await fetch(`/api/budget?userId=${userId}&expenseId=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("this is the delete res", result);

      toast("Deleted the budget successully");
      window.location.href = "/dashboard/budgets";
    } catch (err) {
      console.log(err);
      // toast(err);
    }
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expense
        <span>
          <div className=" flex gap-2 items-center">
            <EditBudget budgetList={budgetList} />
            <AlertDialog>
              <AlertDialogTrigger>
                <Button
                  className="my-2 flex gap-2 cursor-pointer"
                  variant="destructive"
                >
                  <Trash /> Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permenatly delete the current budget along with
                    the expenseList
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteBudget()}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetList ? (
          <BudgetItem budget={budgetList} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense
          BudgetId={id}
          onExpenseAdded={fetchBudgets}
          RefreshExpense={GetExpenseList}
        />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-lg">All Your Expenses</h2>
        <ExpenseList
          expenses={expenseList}
          onLoad={fetchBudgets}
          RefreshExpense={GetExpenseList}
        />
      </div>
    </div>
  );
}

export default Expenses;
