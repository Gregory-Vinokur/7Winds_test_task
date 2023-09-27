import { IRow } from "../../../interfaces/IRow";

export type TableProps = {
  level: number;
  hasChildren?: boolean;
  row?: IRow;
  isNew?: boolean;
  parentId?: number | null;
};