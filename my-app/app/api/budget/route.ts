import { Budget, Expense } from "../../../models/models";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import dynamoose from "@/app/lib/dynamoose";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  try {
    const data = await Budget.query("userId").eq(userId).exec();
    const budgets = await Budget.query("userId").eq(userId).exec(); //list of budgets
    const expenses = await Expense.query("userId").eq(userId).exec(); //list of expense
    const budgetMap = budgets.reduce((acc, budget) => {
      acc[budget.expenseId] = budget;
      return acc;
    }, {} as Record<string, (typeof budgets)[0]>);
    console.log("this is acc", budgetMap);

    const joinExpense = expenses.map((expense) => {
      const relatedBudget = budgetMap[expense.BudgetId];
      return {
        ...expense,
        budgetName: relatedBudget?.name || null,
        budgetIcon: relatedBudget?.icon || null,
        budgetAmount: relatedBudget?.amount || null,
        budgetDate: relatedBudget?.date || null,
      };
    });
    console.log("this is the mapped data", joinExpense);

    const budgetTotals = joinExpense.reduce(
      (acc, expense) => {
        const id = expense.BudgetId;
        if (!acc[id]) {
          acc[id] = {
            totalSpent: 0,
            name: expense.budgetName,
            icon: expense.budgetIcon,
            amount: expense.budgetAmount,
            expenseId: id,
          };
        }
        acc[id].totalSpent += expense.amount;
        return acc;
      },
      {} as Record<
        string,
        {
          totalSpent: number;
          name: string;
          icon: string;
          amount: number;
          expenseId: string;
        }
      >
    );
    const fullBudgetList = budgets.map((budget) => {
      const matched = budgetTotals[budget.expenseId];
      return (
        matched ?? {
          totalSpent: 0,
          name: budget.name,
          icon: budget.icon,
          amount: budget.amount,
          expenseId: budget.expenseId,
        }
      );
    });
    console.log("this is the parti expense", fullBudgetList);

    const budgetSummaryArray = Object.values(budgetTotals);

    console.log("this is the parti expense", budgetSummaryArray);
    console.log("this is data", data);
    return NextResponse.json({ data: fullBudgetList });
  } catch (error) {
    console.log("error while fetching data", error);
    return NextResponse.json(
      { error: "Failed to fetch the budgets" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  const body = await req.json();
  console.log("this is the res", body);
  const { Name, amount, icon, userid } = body;

  const budget = new Budget({
    userId: userid,
    expenseId: uuidv4(),
    name: Name,
    amount,
    icon,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("passed the model");
  await budget.save();

  return NextResponse.json({ message: "Saved successfully", budget });
}
export async function DELETE(req: NextRequest) {
  console.log("Budget model name:", Budget.name);
  console.log("Expense model name:", Expense.name);

  const userId = req.nextUrl.searchParams.get("userId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");
  if (!userId || !expenseId) {
    return NextResponse.json({ error: "Missing Parameters" }, { status: 400 });
  }
  try {
    const allExpenses = await Expense.scan("userId").eq(userId).exec();
    const relatedExpenses = allExpenses.filter(
      (item) => item.BudgetId === expenseId
    );
    console.log(relatedExpenses);

    const deleteExpenseOps = relatedExpenses.map((expense) =>
      Expense.transaction.delete({
        userId: expense.userId,
        SingleExpenseId: expense.SingleExpenseId,
      })
    );
    const deleteBudgetOp = Budget.transaction.delete({
      userId,
      expenseId,
    });

    await dynamoose.transaction([...deleteExpenseOps, deleteBudgetOp]);
    return NextResponse.json({
      message: "Budget and its related expenses (if any) deleted successfully",
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Transaction failed while deleting" },
      { status: 500 }
    );
  }
}
