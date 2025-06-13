// lib/auth.ts
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signJWT(payload: JWTPayload, expiresIn = "72h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT verification failed", error);
    return null;
  }
}

const secretKey: Uint8Array<ArrayBufferLike> = new TextEncoder().encode(
  process.env.JWT_SECRET!
);
const secretString: string = new TextDecoder("utf-8").decode(secretKey);
export async function decodeJwt(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secretString)
    );
    console.log("this is payload", payload);
    return payload;
  } catch (error) {
    console.error("JWT fetching failed:", error);
    return null;
  }
}
