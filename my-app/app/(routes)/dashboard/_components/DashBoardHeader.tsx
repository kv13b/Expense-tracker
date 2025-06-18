"use client";
import Image from "next/image";
import { getCookie } from "cookies-next/client";
function DashBoardHeader() {
  const username = getCookie("username");

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardHeader;
