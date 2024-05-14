"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { useFirestore, useFirestoreDetail } from "@/lib/useFirestore";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import { useData } from "@/lib/DataProvider";

import { DetailPieChartComponent } from "@/components/module/detail/detail-pie-chart-component";

import {
  DetailLineChartComponent,
  DetailLineChartDataProps,
} from "@/components/module/detail/detail-line-chart-component";

const DetailRecord = ({ params }: { params: { id: string } }) => {
  const regex = new RegExp(`^${params.id}#\\d{2}:\\d{2}$`);

  const { data: dataCtx } = useData();
  const {
    data: summaryData,
    loading: isSummaryLoading,
    error: isSummaryError,
  } = useFirestoreDetail("summary", params.id);

  const {
    data: emotionsData,
    loading: isEmotionLoading,
    error: isEmotionError,
  } = useFirestore("emotions");

  useEffect(() => {}, [summaryData]);

  if (isSummaryLoading || isEmotionLoading)
    return (
      <main>
        <Skeleton className="w-full h-screen" />
      </main>
    );

  return (
    <main className="p-16 overflow-auto max-h-[92vh] flex flex-col gap-8">
      <div className="flex flex-col items-start justify-center border rounded-xl w-full p-6">
        <h1 className="text-xl font-bold">Video Analytics</h1>
        <div className="flex mt-12 justify-around">
          <DetailLineChartComponent
            data={
              emotionsData
                .filter((data) => regex.test(data.id))
                .map((item) => ({
                  time: item.id.split("#")[1],
                  positive: item.data.positive,
                  negative: item.data.negative,
                  neutral: item.data.neutral,
                })) as DetailLineChartDataProps[]
            }
          />
          <div className="">
            <DetailPieChartComponent
              data={[
                {
                  name: "positive",
                  value: summaryData.data?.positive,
                },
                {
                  name: "negative",
                  value: summaryData.data?.negative,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        <video
          className="rounded-xl w-full"
          src={dataCtx?.url}
          controls
        ></video>
      </div>
    </main>
  );
};

export default DetailRecord;
