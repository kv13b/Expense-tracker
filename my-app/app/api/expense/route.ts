import { error } from "console";
import { Budget, Expense } from "../../../models/models";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  console.log("expense param data is ", req);

  const userId = req.nextUrl.searchParams.get("userId");
  const budgetId = req.nextUrl.searchParams.get("budgetId");
  if (!userId || !budgetId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  try {
    // const data = await Expense.get({ userId, budgetId });
    const allexpense = await Expense.scan("userId").eq(userId).exec();
    const filtered = allexpense.filter((item) => item.BudgetId === budgetId);
    console.log("this is indi expense", filtered);
    return NextResponse.json({ data: filtered });
  } catch (error) {
    console.log("error while fetching data", error);
    return NextResponse.json(
      { error: "Failed to fetch the budgets" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");

  if (!userId || !expenseId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  try {
    await Expense.delete({ userId: userId, SingleExpenseId: expenseId });
    return NextResponse.json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
}
