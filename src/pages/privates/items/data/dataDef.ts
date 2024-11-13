import { ColDefType } from "@/interfaces/colDef";

export const ColDef:ColDefType={
    name:"Nombre",
    description:"Descripción"
}
export const KeyDataView:ColDefType={
   ...ColDef
   // los demas elementos de la data
}