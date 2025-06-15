"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

async function SideNavBar() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expense",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  });
  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image src={"/logo.svg"} alt="logo" height={100} width={120} />
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path}>
            <h2
              className={`flex gap-2 items-center text-gray-700 font-medium mb-2 p-5 cursor-pointer rounded-md
          hover:text-primary hover:bg-blue-200 ${
            path === menu.path && "text-primary bg-blue-100"
          }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="flex flex-row items-center">
        <div
          className="border bodrder-gray-200 p-2 rounded-[50%] inline-block hover:text-primary hover:bg-blue-200"
          style={{ width: "50px", height: "50px" }}
        >
          <Image src="/user.png" width={40} height={20} alt="profile-pic" />
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
