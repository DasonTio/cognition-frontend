"use client";

// Built-In React
import { useEffect, useState } from "react";

// External Component
import { Smiley, SmileySad, FileVideo } from "@phosphor-icons/react";
import { Skeleton } from "@/components/ui/skeleton";

// External Firebase
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";

// Internal Component
import { DashboardCardComponent } from "@/components/module/dashboard/dashboard-card-component";
import { DashboardChartComponent } from "@/components/module/dashboard/dashboard-chart-component";

// Internal Firebase
import { fireStorage, fireStore } from "./firebase";
import { useFirestore } from "@/lib/useFirestore";
import { getAllFiles, useFirestorage } from "@/lib/useFirestorage";

export default function Home() {
  const [data, setData] = useState([
    {
      name: "January",
      positive: 0,
      negative: 0,
    },
    {
      name: "February",
      positive: 0,
      negative: 0,
    },
    {
      name: "March",
      positive: 0,
      negative: 0,
    },
    {
      name: "April",
      positive: 0,
      negative: 0,
    },
    {
      name: "May",
      positive: 0,
      negative: 0,
    },
    {
      name: "June",
      positive: 0,
      negative: 0,
    },
    {
      name: "July",
      positive: 0,
      negative: 0,
    },
  ]);
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
    const ws = new WebSocket("ws://localhost:8779");
    const img = document.getElementById("video-stream") as HTMLImageElement;

    ws.onmessage = (event) => {
      img.src = "data:image/jpeg;base64," + event.data;
    };

    // Firestore real-time listener
    const unsubscribe = onSnapshot(
      collection(fireStore, "summary"),
      (snapshot) => {
        const documents: any[] = [];
        snapshot.forEach((doc) => {
          documents.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setSummary(documents);

        setPositiveSum(
          documents.reduce((prev, curr) => prev + curr.positive, 0)
        );

        setNegativeSum(
          documents.reduce((prev, curr) => prev + curr.negative, 0)
        );
        const total = (positiveSum as number) + (negativeSum as number);
        setData([
          {
            name: "January",
            positive: 0,
            negative: 0,
          },
          {
            name: "February",
            positive: 0,
            negative: 0,
          },
          {
            name: "March",
            positive: 0,
            negative: 0,
          },
          {
            name: "April",
            positive: 0,
            negative: 0,
          },
          {
            name: "May",
            positive: (((positiveSum as number) / total) as number) * 100,
            negative: (((negativeSum as number) / total) as number) * 100,
          },
          {
            name: "June",
            positive: 0,
            negative: 0,
          },
          {
            name: "July",
            positive: 0,
            negative: 0,
          },
        ]);
      }
    );

    return () => {
      unsubscribe();
      ws.close();
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
          <section className="flex gap-8">
            <DashboardChartComponent data={data} />

            <img
              id="video-stream"
              src=""
              alt="Live Camera"
              className="w-full h-[400px] border rounded-2xl flex items-center justify-center"
            />
          </section>
        </section>
      </div>
    </main>
  );
}
