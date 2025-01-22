import { cn } from "@/lib/utils";
import { createContext, useEffect, useRef, useState } from "react";
import { LayoutHeader } from "../LayoutHeader";
import { LayoutBody } from "../LayoutBody";

export const LayoutContext = createContext<{
  offset: number;
  fixed: boolean;
} | null>(null);
interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}
export const LayoutProvider = ({
  className,
  fixed = false,
  ...props
}: LayoutProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const div = divRef.current;

    if (!div) return;
    const onScroll = () => setOffset(div.scrollTop);

    // clean up code
    div.removeEventListener("scroll", onScroll);
    div.addEventListener("scroll", onScroll, { passive: true });
    return () => div.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout="layout"
        className={cn(
          "scrollOverflow h-full overflow-auto",
          fixed && "flex flex-col",
          className
        )}
        {...props}
      />
    </LayoutContext.Provider>
  );
};
LayoutProvider.displayName = "Layout";

LayoutProvider.Header = LayoutHeader;
LayoutProvider.Body = LayoutBody;
