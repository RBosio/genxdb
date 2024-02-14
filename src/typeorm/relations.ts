import { DataTableI } from "../interfaces/dataTable.js";
import { RelationI } from "../interfaces/relations.js";
import { getName, getNameLower } from "./lib.js";

export const relations = (table: DataTableI): string[] => {
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

const oneToOne = (name: string, join: boolean): string => {
  const r = [
    `    @OneToOne(() => ${getName(name)})`,
    `${join ? "    @JoinColumn()" : ""}`,
    `    ${getNameLower(name)}: ${getName(name)}`,
  ];

  return join
    ? r.join("\n")
    : r.filter((rel) => rel.length > 0).join("\n");
};

const oneToMany = (name: string, rel: string): string => {
  const r = [
    `    @OneToMany(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel} )`,
    `    ${getNameLower(name)}s: ${getName(name)}`,
  ].join("\n");

  return r;
};

const manyToOne = (name: string, rel: string): string => {
  const r = [
    `    @ManyToOne(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel}s )`,
    `    ${getNameLower(name)}: ${getName(name)}`,
  ].join("\n");

  return r;
};

const manyToMany = (name: string, rel: string, join: boolean): string => {
  const r = [
    `    @ManyToMany(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel}s )`,
    `${join ? "    @JoinTable()" : ""}`,
    `    ${getNameLower(name)}s: ${getName(name)}[]`,
  ];

  return join
    ? r.join("\n")
    : r.filter((rel) => rel.length > 0).join("\n");
};
