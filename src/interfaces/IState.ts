import { IRow } from "./IRow";

export interface IState {
  rows: {
    clientSideRows: IRow[];
  }
}
