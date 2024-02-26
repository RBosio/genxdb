import { DataTableI } from "../interfaces/dataTable";

import { getName } from "./lib.js";

export const setHeader = (table: DataTableI): string[] => {
  const header = [
    `import { Entity, PrimaryGeneratedColumn, Column${
      relationOneToOne(table) ? ", OneToOne" : ""
    }${joinColumn(table) ? ", JoinColumn" : ""}${
      relationOneToMany(table) ? ", OneToMany" : ""
    }${relationManyToOne(table) ? ", ManyToOne" : ""}${
      relationManyToMany(table) ? ", ManyToMany" : ""
    }${joinTable(table) ? ", JoinTable" : ""} } from "typeorm"`,
    table.relations
      ? "\n" +
        table.relations
          .map((rel) => {
            return `import { ${getName(rel.table)} } from "./${
              rel.table
            }.entity"\n`;
          })
          .join("")
      : "",
    "@Entity()",
    `export class ${getName(table.name)} {`,
  ];

  return header;
};

const relationOneToOne = (table: DataTableI): boolean => {
  return table.relations?.filter((rel) => rel.relation === "1-1").length > 0;
};

const relationOneToMany = (table: DataTableI): boolean => {
  return table.relations?.filter((rel) => rel.relation === "1-N").length > 0;
};

const relationManyToOne = (table: DataTableI): boolean => {
  return table.relations?.filter((rel) => rel.relation === "N-1").length > 0;
};

const relationManyToMany = (table: DataTableI): boolean => {
  return table.relations?.filter((rel) => rel.relation === "N-M").length > 0;
};

const joinColumn = (table: DataTableI) => {
  return table.relations?.filter((rel) => rel.joinColumn).length > 0;
};

const joinTable = (table: DataTableI) => {
  return table.relations?.filter((rel) => rel.joinTable).length > 0;
};
