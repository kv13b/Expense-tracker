import { Trash } from "lucide-react";
import { getCookie } from "cookies-next/client";
import { toast } from "sonner";

type ExpenseItem = {
  date: string;
  name: string;
  amount: string;
};

const ExpenseList = ({
  expenses,
  onLoad,
}: {
  expenses: ExpenseItem[];
  onLoad: () => void;
}) => {
  const DeleteExpense = async (expense: any) => {
    const userid = getCookie("userid");
    console.log(expense.SingleExpenseId);
    try {
      await fetch(
        `/api/expense?userId=${userid}&expenseId=${expense.SingleExpenseId}`,
        {
          method: "DELETE",
        }
      );
      toast("Expense deleted successfully");
      onLoad();
    } catch (err) {
      console.log(err);
      toast("Coudnt delete the expense");
    }
  };
  return (
    <div className="mt-3">
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expenses.map((expense, index) => {
        const formmatteddate = new Date(expense.date).toLocaleDateString(
          "en-IN",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        return (
          <div key={index} className="grid grid-cols-4 bg-slate-50 p-2">
            <h2>{expense.name}</h2>
            <h2>{expense.amount}</h2>
            <h2>{formmatteddate}</h2>
            <h2>
              <Trash
                className="text-red-600 cursor-pointer"
                onClick={() => DeleteExpense(expense)}
              />
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
