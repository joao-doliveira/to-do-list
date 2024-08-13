import * as React from "react";

import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils";

const oswald = Oswald({ subsets: ["latin"] });

export interface H1Props
  extends React.InputHTMLAttributes<HTMLHeadingElement> {}

const H1 = React.forwardRef<HTMLInputElement, H1Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        className={cn(
          `${oswald.className} scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </h1>
    );
  }
);
H1.displayName = "H1";

export { H1 };
