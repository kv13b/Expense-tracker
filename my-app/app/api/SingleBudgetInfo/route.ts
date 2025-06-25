import { Expense } from "../../../models/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("expense param data is ", req);

  const userId = req.nextUrl.searchParams.get("userId");
  const expenseId = req.nextUrl.searchParams.get("expenseId");
  if (!userId || !expenseId) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }
  try {
    const data = await Expense.get({ userId, expenseId });
    return NextResponse.json({ data });
  } catch (error) {
    console.log("error while fetching data", error);
    return NextResponse.json(
      { error: "Failed to fetch the budgets" },
      { status: 500 }
    );
  }
}
