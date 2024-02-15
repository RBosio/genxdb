import { ColumnI } from "../interfaces/column";
import { DataTableI } from "../interfaces/dataTable";

export const template = (table: DataTableI) => `${table.columns.map((col) => {
  let text = "";
  if (isNull(col)) {
    text = isNull(col).concat(",", isDefault(col));
  } else if (isDefault(col)) {
    text = isDefault(col);
  }

  text = text[text.length - 1] === "," ? text.slice(0, text.length - 1) : text;

  return ` 
    ${
      table.primary === col.name
        ? `@PrimaryGeneratedColumn()`
        : `@Column(${text.length > 0 ? "{" : ""}${
            text.length > 0 ? text.concat(" ") : ""
          }${text.length > 0 ? "}" : ""})`
    }
    ${col.name}: ${col.type}
`;
})}
  `;

const isNull = (col: ColumnI): string => {
  return typeof col.nullable === "boolean"
    ? ` nullable: ${col.nullable?.toString()}`
    : "";
};

const isDefault = (col: ColumnI): string => {
  if (typeof col.default !== "undefined") {
    let str = " default: ";
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

    return str;
  }
  return "";
};
