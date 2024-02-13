import { tableDataI } from "../interfaces/dataTable.js";
import { RelationI } from "../interfaces/relations.js";
import { setHeader } from "./header.js";
import { formatBody, getName, getNameLower } from "./lib.js";
import { template } from "./template.js";

export const relations = (table: tableDataI): string[] => {
  const relations: string[] = [];

  table.relations
    .filter((rel) => rel.relation === "1-1")
    .map((rel: RelationI) => {
      relations.push(oneToOne(rel.table, rel.joinColumn), "");
    });

  table.relations
    .filter((rel) => rel.relation === "1-N")
    .map((rel: RelationI) => {
      relations.push(oneToMany(rel.table, table.name), "");
    });

  table.relations
    .filter((rel) => rel.relation === "N-1")
    .map((rel: RelationI) => {
      relations.push(manyToOne(rel.table, table.name), "");
    });

  table.relations
    .filter((rel) => rel.relation === "N-M")
    .map((rel: RelationI) => {
      relations.push(manyToMany(rel.table, table.name, rel.joinTable), "");
    });

  return relations;
};

export const oneToOne = (name: string, join: string): string => {
  const r = [
    `    @OneToOne(() => ${getName(name)})`,
    `${join === "true" ? "    @JoinColumn()" : ""}`,
    `    ${getNameLower(name)}: ${getName(name)}`,
  ];

  return join === "true"
    ? r.join("\n")
    : r.filter((rel) => rel.length > 0).join("\n");
};

export const oneToMany = (name: string, rel: string): string => {
  const r = [
    `    @OneToMany(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel} )`,
    `    ${getNameLower(name)}s: ${getName(name)}`,
  ].join("\n");

  return r;
};

export const manyToOne = (name: string, rel: string): string => {
  const r = [
    `    @ManyToOne(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel}s )`,
    `    ${getNameLower(name)}: ${getName(name)}`,
  ].join("\n");

  return r;
};

export const manyToMany = (name: string, rel: string, join: string): string => {
  const r = [
    `    @ManyToMany(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel}s )`,
    `${join === "true" ? "    @JoinTable()" : ""}`,
    `    ${getNameLower(name)}s: ${getName(name)}[]`,
  ];

  return join === "true"
    ? r.join("\n")
    : r.filter((rel) => rel.length > 0).join("\n");
};
