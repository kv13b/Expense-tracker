import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function BarChartDash({ budgetList }: { budgetList: budgetList }) {
  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg p-2">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          width={500}
          height={500}
          data={budgetList}
          margin={{
            top: 7,
            // right: 5,
            // left: 5,
            // bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" />
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default BarChartDash;
