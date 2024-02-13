import { DataTableI } from "./dataTable";

export interface DatabaseI {
  version: string;
  database: DataTableI[];
}
