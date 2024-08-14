import { cn } from "@/lib/utils";
import React from "react";

interface CardProps {
  children: React.ReactElement[];
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 p-6 border rounded-2xl border-slate-400 bg-background",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
