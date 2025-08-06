import { NextRequest, NextResponse } from "next/server";
import { Expense, User } from "../../../models/models";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { error } from "console";
export async function POST(req: Request) {
  const body = await req.json();
  console.log(body, "this is body");

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = new User({
      id: uuidv4(),
      username: body.username,
      email: body.email,
      password: hashedPassword,
    });

    await user.save();
    console.log("user created ", user);
    return NextResponse.json({ message: "User created successfully!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
//GET METHOD OF FETCHING BUDGETS OF USER
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "Missing userid" }, { status: 400 });
  }
  try {
    const expense = await Expense.query("userId").eq(userId).exec();
    console.log("this is the budget list ", expense);
    return NextResponse.json({ data: expense });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
}
