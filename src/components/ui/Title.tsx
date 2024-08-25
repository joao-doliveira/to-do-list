import * as React from "react";

import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils";

const oswald = Oswald({ subsets: ["latin"] });

export interface TitleProps
  extends React.InputHTMLAttributes<HTMLHeadingElement> {}

const Title = React.forwardRef<HTMLInputElement, TitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        className={cn(
          `${oswald.className} scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Title.displayName = "Title";

export { Title };
