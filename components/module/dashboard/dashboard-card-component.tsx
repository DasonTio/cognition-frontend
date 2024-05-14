import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  Icon: React.ElementType<any>;
  title: string;
  content: number | boolean;
  footer: string;
}

export const DashboardCardComponent: React.FC<Props> = ({
  Icon,
  title,
  content,
  footer,
}) => {
  if (!content)
    return <Skeleton className="w-[350px] h-[160px] pt-6 rounded-xl" />;

  return (
    <Card className="w-[350px] pt-6 rounded-xl">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h1>{title}</h1>
          <Icon />
        </div>
        <p className="text-2xl font-black">{content}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-300">{footer}</p>
      </CardFooter>
    </Card>
  );
};
