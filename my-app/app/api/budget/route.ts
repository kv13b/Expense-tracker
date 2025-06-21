import { Expense } from "../../../models/models";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }
  try {
    const data = await Expense.query("userId").eq(userId).exec();
    return NextResponse.json({ data });
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

  const expense = new Expense({
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
  await expense.save();

  return NextResponse.json({ message: "Saved successfully", expense });
}
