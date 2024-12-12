import { Button } from "../custom/button";

const CrudHeader = ({
  title,
  nameAction = "Add",
  onAdd,
}: {
  title: string;
  nameAction: string;
  onAdd: () => void;
}) => {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button onClick={onAdd}>{nameAction}</Button>
    </div>
  );
};

export default CrudHeader;
