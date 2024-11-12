import { Item } from "../models/item";
interface ViewDataProps {
  currentItem: Item | null;
}

const ViewData = ({ currentItem }: ViewDataProps) => {
  return (
    <>
      <h2>{currentItem?.name}</h2>
      <p>Status: {currentItem?.name}</p>
      <p>Fecha: {currentItem?.description}</p>
    </>
  );
};
export default ViewData;
