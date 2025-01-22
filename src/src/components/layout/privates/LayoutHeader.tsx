import { forwardRef, useContext } from "react";

import { cn } from "@/lib/utils";
import { LayoutContext, LayoutProvider } from "./context/LayoutContext";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  sticky?: boolean;
}

export const LayoutHeader = forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, sticky, ...props }, ref) => {
    // Check if Layout.Header is used within Layout
    const contextVal = useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(
        `Layout.Header must be used within ${LayoutProvider.displayName}.`
      );
    }

    return (
      <div
        ref={ref}
        data-layout="header"
        className={cn(
          `z-10 flex h-[var(--header-height)] items-center gap-4 bg-background p-2 md:px-8`,
          contextVal.offset > 10 && sticky ? "shadow" : "shadow-none",
          contextVal.fixed && "flex-none",
          sticky && "sticky top-0",
          className
        )}
        {...props}
      />
    );
  }
);
LayoutHeader.displayName = "Header";
