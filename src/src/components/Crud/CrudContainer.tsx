import { ReactNode } from "react";

const CrudContainer = ({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) => {
  return (
    <div className="container mx-auto p-2 space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
};
export default CrudContainer;
