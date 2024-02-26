export interface RelationI {
  table: string;
  relation: string;
  joinColumn?: boolean;
  joinTable?: boolean;
  origin: string;
}
