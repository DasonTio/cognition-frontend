"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ChartBar, FilmReel, InstagramLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import BaseSidebarTileComponent from "./base-sidebar-tile-component";
import { HouseSimple } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";

const BaseSidebarComponent = () => {
  const [panelSize, setPanelSize] = useState(6);
  const handleResizePanel = (size: number) => {
    setPanelSize(size);
  };

  const router = useRouter();
  const pathName = usePathname();

  return (
    <ResizablePanel
      defaultSize={12}
      minSize={6}
      maxSize={14}
      onResize={handleResizePanel}
      className="min-w-[100px]"
    >
      {/* Sidebar Content */}
      <ResizablePanelGroup
        direction="vertical"
        className="rounded-lg w-full min-h-screen"
      >
        <ResizablePanel defaultSize={8}>
          <div className="flex h-full justify-center items-center gap-6">
            <span className="font-semibold border-gray-600 rounded-lg">
              <InstagramLogo size={30} />
            </span>
            {panelSize > 11 && <p className="text-xl">Cognition</p>}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={92}>
          <div className="flex flex-col gap-4 p-4">
            <BaseSidebarTileComponent
              Icon={HouseSimple}
              title="Dashboard"
              isActive={pathName == "/"}
              isExpanded={panelSize > 11}
              onClick={() => {
                router.push("/");
              }}
            />
            <BaseSidebarTileComponent
              Icon={FilmReel}
              title="Videos"
              trail="10"
              isActive={pathName == "/record"}
              isExpanded={panelSize > 11}
              onClick={() => {
                router.push("/record");
              }}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </ResizablePanel>
  );
};
export default BaseSidebarComponent;
