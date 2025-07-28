import React from "react";
import { BarChart } from "recharts";
function BarChartDash({ budgetList }: { budgetList: budgetList }) {
  return (
    <div>
      <BarChart
        width={500}
        height={500}
        data={budgetList}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        {" "}
      </BarChart>
    </div>
  );
}
export default BarChartDash;
