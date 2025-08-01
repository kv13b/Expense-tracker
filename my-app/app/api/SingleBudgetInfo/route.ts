import { Budget, Expense } from "../../../models/models";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  console.log("expense param data is ", req);

  const userId = req.nextUrl.searchParams.get("userId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");
  if (!userId || !expenseId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  try {
    const data = await Budget.get({ userId, expenseId });
    const expenses = await Expense.scan("userId").eq(userId).exec();
    const filtered = expenses.filter((e) => e.BudgetId === expenseId);
    const totalSpent = filtered.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );
    const enhacedData = {
      ...data,
      totalSpent,
    };
    console.log("this is the data", data);
    console.log("this is the expense of that parti data", enhacedData);
    return NextResponse.json({ data: enhacedData });
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
  const { Name, amount, BudgetId, userid } = body;

  const expense = new Expense({
    userId: userid,
    SingleExpenseId: uuidv4(),
    name: Name,
    amount,
    BudgetId: BudgetId,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  console.log("passed the model");
  await expense.save();

  return NextResponse.json({ message: "Saved successfully", expense });
}
