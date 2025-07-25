"use client";
import React from "react";
import { getCookie } from "cookies-next/client";

function page() {
  const username = getCookie("username");
  console.log("this si usn", username);
  return (
    <div className="p-5">
      <h2 className="font-bold text-3xl">Hi {username}</h2>
      <p>Here's What's Happening to Your Money</p>
    </div>
  );
}

export default page;
