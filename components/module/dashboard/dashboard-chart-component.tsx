"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React from "react";
import { XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

const BarChart = dynamic(
  () => import("recharts").then((recharts) => recharts.BarChart),
  {
    ssr: false,
  }
);

interface dataProps {
  positive: number;
  negative: number;
}

interface Props {
  data: dataProps[] | false;
}

export const DashboardChartComponent: React.FC<Props> = ({ data }) => {
  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  if (data == false)
    return (
      <Skeleton className="w-[790px] h-[450px] rounded-xl border py-6 pt-10" />
    );

  return (
    <Card className="flex items-center justify-center rounded-xl border py-6 pt-10">
      <CardContent>
        <BarChart
          width={730}
          height={300}
          data={data as dataProps[]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="name"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip cursor={{ fill: "#ffffff" }} />
          <Legend />
          <Bar
            type="monotone"
            dataKey="positive"
            fill="#1d1d1d"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            type="monotone"
            dataKey="negative"
            fill="#dedede"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </CardContent>
    </Card>
  );
};
