import { cn } from "@/lib/utils";
import { forwardRef, useContext } from "react";
import { LayoutContext } from "./context/LayoutContext";

export const LayoutBody = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  // Check if Layout.Body is used within Layout
  const contextVal = useContext(LayoutContext);
  if (contextVal === null) {
    throw new Error(
      `Layout.Body must be used within ${LayoutContext.displayName}.`
    );
  }

  return (
    <div
      ref={ref}
      data-layout="body"
      className={cn(
        "p-4 md:overflow-hidden",
        contextVal && contextVal.fixed && "flex-1",
        className
      )}
      {...props}
    />
  );
});
LayoutBody.displayName = "Body";
