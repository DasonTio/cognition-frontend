"use client";
// Built-In React
import { useEffect, useState } from "react";

// External Component
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChartBar } from "@phosphor-icons/react/dist/ssr";
import { Skeleton } from "@/components/ui/skeleton";

// Internal Firebase
import { fireStorage, fireStore } from "../firebase";

// External Firebase
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useData } from "@/lib/DataProvider";

async function getAllFiles() {
  const listRef = ref(fireStorage);
  const all = await listAll(listRef).then((res) => res.items);
  return all;
}

export default function Record() {
  const router = useRouter();

  const { setData } = useData();

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<{ [key: string]: any[] }>({
    // "12-08-2024": [],
  });

  useEffect(() => {
    getAllFiles()
      .then(async (files) => {
        const videosToUpdate: { [key: string]: any[] } = {};
        for (const file of files) {
          const metadata = await getMetadata(file);
          const url = await getDownloadURL(file);

          const date = new Date(metadata.timeCreated).toLocaleDateString(
            "en-US",
            { day: "2-digit", month: "long", year: "numeric" }
          );

          const data = {
            metadata: metadata,
            url: url,
          };

          videosToUpdate[date] = videosToUpdate[date]
            ? [...videosToUpdate[date], data]
            : [data];
        }
        setVideos((prevVideos) => ({
          ...prevVideos,
          ...videosToUpdate,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleRouting = (video: any) => {
    setData(video);
    router.push(`record/${video.metadata.name.slice(0, 6)}`);
  };

  if (Object.keys(videos).length == 0) {
    return (
      <main className="overflow-auto max-h-[92vh] p-16 flex flex-col gap-4 ">
        <Skeleton className="w-full h-[75px]" />
        <Skeleton className="w-full h-[75px]" />
        <Skeleton className="w-full h-[75px]" />
        <Skeleton className="w-full h-[75px]" />
      </main>
    );
  }

  return (
    <main className="overflow-auto max-h-[92vh] p-16 ">
      <Accordion
        type="single"
        collapsible
        className="flex flex-col gap-8"
      >
        {Object.keys(videos).map((date, index) => (
          <AccordionItem
            key={index}
            value={date}
            className="flex flex-col gap-4"
          >
            <AccordionTrigger>{date}</AccordionTrigger>
            <AccordionContent className="flex flex-wrap gap-4">
              {/* Videos Card */}
              {videos[date].map((video, secondIndex) => (
                <div
                  className="w-[350px] flex flex-col cursor-pointer"
                  key={index + secondIndex}
                  onClick={() => handleRouting(video)}
                >
                  <div className="relative">
                    <div className="absolute flex flex-col items-center justify-center w-full h-full bg-white opacity-0 hover:opacity-90 hover:backdrop-blur-2xl z-10">
                      <ChartBar size={60} />
                      <p>Click to see more details</p>
                    </div>
                    <video
                      src={video.url}
                      className="rounded-xl"
                      onLoadedData={($event) => {
                        $event.currentTarget.currentTime = 2;
                      }}
                    ></video>
                  </div>
                  <p>
                    Uploaded At:{" "}
                    {new Date(video.metadata.timeCreated).toLocaleTimeString()}{" "}
                  </p>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
