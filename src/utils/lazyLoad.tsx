import Loader from "@/components/loader";
import { lazy, Suspense } from "react";

// Función para envolver los componentes con Suspense
export function lazyLoad(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) {
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<Loader />}>
      <LazyComponent />
    </Suspense>
  );
}
