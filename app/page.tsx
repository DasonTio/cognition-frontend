"use client";

// Built-In React
import { useEffect, useState } from "react";

// External Component
import { Smiley, SmileySad, FileVideo } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

// External Firebase
import { collection, getDocs } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";

// Internal Component
import { DashboardCardComponent } from "@/components/module/dashboard/dashboard-card-component";
import { DashboardChartComponent } from "@/components/module/dashboard/dashboard-chart-component";

// Internal Firebase
import { fireStorage, fireStore } from "./firebase";
import { useFirestore } from "@/lib/useFirestore";
import { getAllFiles, useFirestorage } from "@/lib/useFirestorage";

const data = [
  {
    name: "January",
    positive: 20,
    negative: 80,
  },
  {
    name: "February",
    positive: 34,
    negative: 66,
  },
  {
    name: "March",
    positive: 18,
    negative: 82,
  },
  {
    name: "April",
    positive: 77,
    negative: 23,
  },
  {
    name: "May",
    positive: 52,
    negative: 48,
  },
  {
    name: "June",
    positive: 70,
    negative: 30,
  },
  {
    name: "July",
    positive: 80,
    negative: 20,
  },
];

export default function Home() {
  const [summary, setSummary] = useState<any[]>([]);
  // const [videos, setVideos] = useState<string[]>([]);
  const [positiveSum, setPositiveSum] = useState<number | boolean>(false);
  const [negativeSum, setNegativeSum] = useState<number | boolean>(false);

  const {
    data: videos,
    loading: isVideosLoading,
    error: isVideosError,
  } = useFirestore("summary");

  useEffect(() => {
    const unsubscribe = async () => {
      const querySnapshot = await getDocs(collection(fireStore, "summary"));
      const document: any[] = [];
      querySnapshot.forEach((doc) => {
        document.push({
          ...doc.data(),
          id: doc.id,
        });
        setSummary(document);
      });

      setPositiveSum(
        document.reduce((prev, _, i, arr) => prev + arr[i].positive, 0)
      );

      setNegativeSum(
        document.reduce((prev, _, i, arr) => prev + arr[i].negative, 0)
      );
    };
    unsubscribe();
    return () => {
      unsubscribe();
    };
  }, [videos]);

  return (
    <main>
      <div className="flex flex-col gap-8 h-full p-16">
        <header>
          <h1 className="font-black text-4xl">Dashboard</h1>
          <p className="text-lg text-gray-300">
            Emotion Classification Record Overviews
          </p>
        </header>
        <section className="flex flex-col gap-8">
          <div className="flex gap-10 overflow-auto">
            {/* Card */}
            <DashboardCardComponent
              title="Recorded Video"
              Icon={FileVideo}
              content={videos.length}
              footer="+0 video from last month"
            />
            <DashboardCardComponent
              title="Positive Emotions"
              Icon={Smiley}
              content={positiveSum}
              footer="+0 video from last month"
            />
            <DashboardCardComponent
              title="Negative Emotions"
              Icon={SmileySad}
              content={negativeSum}
              footer="+0 video from last month"
            />
          </div>
          <section className="flex">
            <DashboardChartComponent data={data} />
          </section>
        </section>
      </div>
    </main>
  );
}
