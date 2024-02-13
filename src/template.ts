import { ColumnI } from "./interfaces/column";
import { tableDataI } from "./interfaces/dataTable";

export const template = (table: tableDataI) => `${table.columns.map((col) => {
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
  return col.nullable === "true"
    ? " nullable: true"
    : col.nullable === "false"
    ? " nullable: false"
    : "";
};

const isDefault = (col: ColumnI): string => {
  return col.default
    ? ` default: ${col.type === "Date" ? "() => " : ""}${
        col.type === "string" || col.type === "Date" ? '"' : ""
      }${col.default}${col.type === "string" || col.type === "Date" ? '"' : ""}`
    : "";
};
