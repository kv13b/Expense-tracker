import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import { decodeJwt } from "jose/jwt/decode";

async function DashBoardHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value;

  let username = "";
  if (token) {
    const payload = await decodeJwt(token);
    username = (payload?.username as string) || "";
  }
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div className="text-xl font-semibold"></div>
      <div>
        <div className="flex flex-row items-center">
          <div
            className="border bodrder-gray-200 p-2 rounded-[50%] inline-block hover:text-primary hover:bg-blue-200"
            style={{ width: "30px", height: "30px" }}
          >
            <Image src="/user.png" width={40} height={20} alt="profile-pic" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{username}</p>
            <p className="text-xs text-gray-500">Logged In</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHeader;
