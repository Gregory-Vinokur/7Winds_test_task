import { IRow } from "./IRow"

export interface IResponse {
  changed: IRow[]
  current: IRow
}