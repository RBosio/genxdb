export interface ColumnI {
  name: string;
  type: string;
  nullable: boolean;
  unique: boolean;
  length: number;
  default: string | boolean;
}
