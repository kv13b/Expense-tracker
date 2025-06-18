import { Expense } from "../../../models/models";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("this is the res", body);
  const { name, amount, icon, userid } = body;

  const expense = new Expense({
    userId: userid,
    expenseId: uuidv4(),
    name,
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
