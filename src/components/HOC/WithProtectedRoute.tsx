import ProtectedRoute from "@/guards/ProtectedRoute";

const withProtectedRoute = (
  Component: React.ComponentType<any>,
  requiredResource: string,
  requiredAction: string[]
) => {
  return (props: any) => (
    <ProtectedRoute
      requiredResource={requiredResource}
      requiredAction={requiredAction}
    >
      <Component {...props} />
    </ProtectedRoute>
  );
};

export default withProtectedRoute;
