import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import BaseHeadbarComponent from "@/components/base/base-headbar-component";
import BaseSidebarComponent from "@/components/base/base-sidebar-component";
import { DataProvider } from "@/lib/DataProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "h-screen overflow-hidden bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <DataProvider>
          <ResizablePanelGroup
            direction="horizontal"
            className="h-full w-screen rounded-lg border"
          >
            <BaseSidebarComponent />
            <ResizableHandle withHandle></ResizableHandle>
            <ResizablePanel defaultSize={88}>
              {/* Main Content */}
              <ResizablePanelGroup
                direction="vertical"
                className="rounded-lg w-full min-h-screen"
              >
                <BaseHeadbarComponent />
                <ResizableHandle />
                <ResizablePanel defaultSize={92}>{children}</ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </DataProvider>
      </body>
    </html>
  );
}
