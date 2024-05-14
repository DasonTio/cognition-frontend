"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import React from "react";
import { XAxis, YAxis, Tooltip, Legend, Line } from "recharts";

const LineChart = dynamic(
  () => import("recharts").then((recharts) => recharts.LineChart),
  {
    ssr: false,
  }
);

export interface DetailLineChartDataProps {
  time: string;
  positive: number;
  negative: number;
  neutral: number;
}

interface Props {
  data: DetailLineChartDataProps[] | false;
}

export const DetailLineChartComponent: React.FC<Props> = ({ data }) => {
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
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        width={5}
        type="monotone"
        dataKey="positive"
        stroke="#2dd4bf"
        // activeDot={{ r: 8 }}
      />
      <Line
        type="monotone"
        width={5}
        dataKey="negative"
        stroke="#f87171"
      />

      <Line
        type="monotone"
        width={5}
        dataKey="neutral"
        stroke="#dddddd"
      />
    </LineChart>
  );
};
