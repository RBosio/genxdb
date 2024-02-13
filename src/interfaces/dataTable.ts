import { ColumnI } from "./column.js";

export interface tableDataI {
  name: string;
  columns: ColumnI[];
  primary: string;
  relations: string[];
}
