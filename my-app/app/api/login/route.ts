// app/api/login/route.ts
import { signJWT } from "@/app/lib/auth";
import { User } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  const users = await User.query("email").eq(email).exec();
  const user = users[0];
  console.log(user);
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signJWT({ email });
  console.log("this is token", token);
  const res = NextResponse.json({
    message: "Login success",
    user: user.username,
    userid: user.id,
  });
  res.cookies.set("user-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  return res;
}
