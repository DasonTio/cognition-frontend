"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ResizablePanel } from "../ui/resizable";
import { title } from "process";
const getTitle = (path: string) => {
  switch (path) {
    case "":
      return "Dashboard";
    case "record":
      return "Videos";
  }
};

const BaseHeadbarComponent = () => {
  const pathName = usePathname();

  const paths = pathName.split("/").filter(Boolean);

  return (
    <ResizablePanel defaultSize={8}>
      <div className="flex h-full px-16 items-center">
        <Breadcrumb>
          <BreadcrumbList>
            {pathName
              .split("/")
              .slice(1)
              .map((item, i) => (
                <>
                  <BreadcrumbItem key={i}>
                    <BreadcrumbLink
                      href={"/" + paths.slice(0, i + 1).join("/")}
                    >
                      {getTitle(item) ?? item}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathName.split("/").slice(1)[i + 1] && (
                    <BreadcrumbSeparator />
                  )}
                </>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
        {/* <span className="font-semibold">{getTitle(pathName)}</span> */}
      </div>
    </ResizablePanel>
  );
};

export default BaseHeadbarComponent;
