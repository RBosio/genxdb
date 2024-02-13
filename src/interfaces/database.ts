import { tableDataI } from "./dataTable";

export interface databaseI {
  version: string;
  database: tableDataI[];
}
