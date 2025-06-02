import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./app/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;
  const verifiedToken =
    token &&
    (await verifyJWT(token).catch(({ err }: { err: string }) => {
      console.log(err);
    }));
  if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
    return;
  }
  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard"],
};
