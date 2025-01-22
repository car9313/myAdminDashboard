import withProtectedRoute from "@/components/HOC/WithProtectedRoute";
import Spinner from "@/components/Spinner";
import { lazy, Suspense } from "react";

// Función para envolver los componentes con Suspense
export function lazyLoadPublic(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>
) {
  const LazyComponent = lazy(importFunc);
  return (
    <Suspense fallback={<Spinner />}>
      <LazyComponent />
    </Suspense>
  );
}

export function lazyLoadPrivate(
  importFunc: () => Promise<{ default: React.ComponentType<any> }>,
  requiredResource: string,
  requiredAction: string[]
) {
  const LazyComponent = lazy(importFunc);
  const ProtectedLazyComponent = withProtectedRoute(
    LazyComponent,
    requiredResource,
    requiredAction
  );

  return (
    <Suspense fallback={<Spinner />}>
      <ProtectedLazyComponent />
    </Suspense>
  );
}
