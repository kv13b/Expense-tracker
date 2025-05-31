import { NextResponse } from "next/server";
import { User } from "../../../models/models";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
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
