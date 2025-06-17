import { Expense } from "../../../models/models";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, amount, icon } = body;

  const expense = new Expense({
    userId: "demo-user", // You can replace this with actual auth user ID
    expenseId: uuidv4(),
    name,
    amount,
    icon,
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await expense.save();

  return NextResponse.json({ message: "Saved successfully", expense });
}
