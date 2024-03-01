import { RelationI } from "../interfaces/relations";

import { getName } from "../lib/getNames.js";

export const setHeader = (relations: RelationI[]): string[] => {
  const header = [
    `import { Entity, PrimaryGeneratedColumn, Column${
      relationOneToOne(relations) ? ", OneToOne" : ""
    }${joinColumn(relations) ? ", JoinColumn" : ""}${
      relationOneToMany(relations) ? ", OneToMany" : ""
    }${relationManyToOne(relations) ? ", ManyToOne" : ""}${
      relationManyToMany(relations) ? ", ManyToMany" : ""
    }${joinTable(relations) ? ", JoinTable" : ""} } from "typeorm"`,
    relations
      ? "\n" +
        relations
          .map((rel) => {
            return `import { ${getName(rel.table)} } from "./${
              rel.table
            }.entity"\n`;
          })
          .join("")
      : "",
    "@Entity()",
  ];

  return header;
};

const relationOneToOne = (relations: RelationI[]): boolean => {
  return relations.filter((rel) => rel.relation === "1-1").length > 0;
};

const relationOneToMany = (relations: RelationI[]): boolean => {
  return relations.filter((rel) => rel.relation === "1-N").length > 0;
};

const relationManyToOne = (relations: RelationI[]): boolean => {
  return relations.filter((rel) => rel.relation === "N-1").length > 0;
};

const relationManyToMany = (relations: RelationI[]): boolean => {
  return relations.filter((rel) => rel.relation === "N-M").length > 0;
};

const joinColumn = (relations: RelationI[]) => {
  return relations.filter((rel) => rel.joinColumn).length > 0;
};

const joinTable = (relations: RelationI[]) => {
  return relations.filter((rel) => rel.joinTable).length > 0;
};
