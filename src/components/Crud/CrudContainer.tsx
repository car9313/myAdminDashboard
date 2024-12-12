import { ReactNode } from "react";

const CrudContainer = ({ children }: { children: ReactNode }) => {
  return <div className="container mx-auto p-2">{children}</div>;
};
export default CrudContainer;
