import { ColumnI } from "../interfaces/column";
import { DataTableI } from "../interfaces/dataTable";

export const template = (table: DataTableI): string[] => {
  const body: string[] = [];

  table.columns.map((col: ColumnI, idx: number) => {
    body.push(
      `\t${
        isPrimary(table.primary, col)
          ? "@PrimaryGeneratedColumn()"
          : `@Column(${setColumn(col)})`
      }`
    );

    body.push(
      `\t${col.name}: ${col.type}${idx < table.columns.length - 1 ? "\n" : ""}`
    );
  });

  return body;
};

const isPrimary = (primary: string, col: ColumnI): boolean => {
  return primary === col.name ? true : false;
};

const isNull = (col: ColumnI): string[] => {
  return typeof col.nullable === "boolean"
    ? [`nullable: ${col.nullable?.toString()}`]
    : [];
};

const isDefault = (col: ColumnI): string[] => {
  if (typeof col.default !== "undefined") {
    let str = ["default: "];
    if (col.type === "Date") {
      str = str.concat("() => ");
    }
    if (col.type === "Date" || col.type === "string") {
      str = str.concat('"');
    }
    str = str.concat(col.default.toString());
    if (col.type === "Date" || col.type === "string") {
      str = str.concat('"');
    }

    return [str.join("")];
  }

  return [];
};

const isUnique = (col: ColumnI): string[] => {
  return typeof col.unique === "boolean"
    ? [`unique: ${col.unique?.toString()}`]
    : [];
};

const length = (col: ColumnI): string[] => {
  return typeof col.length === "number" && col.type === "string"
    ? [`type: "varchar", length: ${col.length}`]
    : [];
};

const setColumn = (col: ColumnI): string => {
  if (
    isNull(col).length === 0 &&
    isDefault(col).length === 0 &&
    isUnique(col).length === 0 &&
    length(col).length === 0
  )
    return "";

  return `{ ${formatColumn(col)} }`;
};

const formatColumn = (col: ColumnI) => {
  return isNull(col)
    .concat(isDefault(col))
    .concat(isUnique(col))
    .concat(length(col))
    .join(", ");
};
