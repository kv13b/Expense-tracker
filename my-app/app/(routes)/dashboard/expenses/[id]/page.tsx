"use client";
import React, { useEffect } from "react";

function Expenses({ params }: { params: string }) {
  useEffect(() => {
    fetchBudgets();
  }, [params]);
  const fetchBudgets = async () => {
    try {
      const res = await fetch(`/api/budget?userId=${params}`);
      const json = await res.json();
      console.log("data ", json.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>expense</h1>
    </div>
  );
}

export default Expenses;
