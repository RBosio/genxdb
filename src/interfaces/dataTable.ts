import { ColumnI } from "./column.js";
import { RelationI } from "./relations.js";

export interface tableDataI {
  name: string;
  columns: ColumnI[];
  primary: string;
  relations: RelationI[];
}
