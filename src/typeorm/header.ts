import { tableDataI } from "../interfaces/dataTable";

export const setHeader = (table: tableDataI): string => {
  const header = [
    'import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"',
    "",
    "@Entity()",
    `export class ${(table.name.match(/[a-zA-Z0-9]+/g) || [])
      .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
      .join("")} {`,
  ];

  return header.join("\n");
};
