import { DataTableI } from "../interfaces/dataTable.js";
import { RelationI } from "../interfaces/relations.js";
import { getName, getNameLower } from "./lib.js";

export const relations = (rel: RelationI[]): string[] => {
  const relations: string[] = [];

  rel
    .filter((rel) => rel.relation === "1-1")
    .map((rel: RelationI) => {
      relations.push(oneToOne(rel.table, rel.joinColumn));
    });

  rel
    .filter((rel) => rel.relation === "1-N")
    .map((rel: RelationI) => {
      relations.push(oneToMany(rel.table, rel.origin));
    });

  rel
    .filter((rel) => rel.relation === "N-1")
    .map((rel: RelationI) => {
      relations.push(manyToOne(rel.table, rel.origin));
    });

  rel
    .filter((rel) => rel.relation === "N-M")
    .map((rel: RelationI) => {
      relations.push(manyToMany(rel.table, rel.origin, rel.joinTable));
    });

  return relations;
};

const oneToOne = (name: string, join: boolean | undefined): string => {
  const r = [
    `\t@OneToOne(() => ${getName(name)})`,
    `${join ? "\t@JoinColumn()" : ""}`,
    `\t${getNameLower(name)}: ${getName(name)}`,
  ];

  return join ? r.join("\n") : r.filter((rel) => rel.length > 0).join("\n");
};

const oneToMany = (name: string, rel: string): string => {
  const r = [
    `\t@OneToMany(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel} )`,
    `\t${getNameLower(name)}s: ${getName(name)}[]`,
  ].join("\n");

  return r;
};

const manyToOne = (name: string, rel: string): string => {
  const r = [
    `\t@ManyToOne(() => ${getName(name)}, ${getNameLower(
      name
    )} => ${getNameLower(name)}.${rel}s )`,
    `\t${getNameLower(name)}: ${getName(name)}`,
  ].join("\n");

  return r;
};

const manyToMany = (
  name: string,
  rel: string,
  join: boolean | undefined
): string => {
  const r = [
    `\t@ManyToMany(() => ${getName(name)}, ${getNameLower(
      name
    )}s => ${getNameLower(name)}s.${rel}s )`,
    `${join ? "\t@JoinTable()" : ""}`,
    `\t${getNameLower(name)}s: ${getName(name)}[]`,
  ];

  return join ? r.join("\n") : r.filter((rel) => rel.length > 0).join("\n");
};
