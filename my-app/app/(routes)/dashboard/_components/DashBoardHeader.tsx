import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashBoardHeader() {
  return (
    <div className="p-5 shadow-sm border-b flex justify-between">
      <div className="text-xl font-semibold"></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashBoardHeader;
