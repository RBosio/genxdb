import { DatabaseI } from "../interfaces/database";
import { RelationI } from "../interfaces/relations";

const rela: RelationI[] = [];

export const formatRelations = (data: DatabaseI) => {
  let relations: RelationI[] = [];

  data.database.forEach((table) => {
    const temp = table.relations?.map((rel) => {
      return {
        ...rel,
        origin: table.name,
      };
    });

    if (temp) {
      relations = relations.concat(temp);
    }
  });

  relations.forEach((rel: RelationI) => {
    if (rel.relation === "1-N") {
      oneToMany(relations, rel);
    }

    if (rel.relation === "N-1") {
      manyToOne(relations, rel);
    }

    if (rel.relation === "1-1") {
      oneToOne(relations, rel);
    }

    if (rel.relation === "N-M") {
      manyToMany(relations, rel);
    }
  });

  return relations.concat(rela);
};

const oneToMany = (relations: RelationI[], rel: RelationI) => {
  let band = false;

  relations.map((e: RelationI) => {
    if (
      e.table === rel.origin &&
      e.relation === "N-1" &&
      e.origin === rel.table
    ) {
      band = true;
    }
  });

  if (!band) {
    rela.push({
      table: rel.origin,
      relation: "N-1",
      origin: rel.table,
    });
  }
};

const manyToOne = (relations: RelationI[], rel: RelationI) => {
  let band = false;

  relations.map((e: RelationI) => {
    if (
      e.table === rel.origin &&
      e.relation === "1-N" &&
      e.origin === rel.table
    ) {
      band = true;
    }
  });

  if (!band) {
    rela.push({
      table: rel.origin,
      relation: "1-N",
      origin: rel.table,
    });
  }
};

const oneToOne = (relations: RelationI[], rel: RelationI) => {
  let band = false;

  relations.map((e: RelationI) => {
    if (
      e.table === rel.origin &&
      e.relation === "1-1" &&
      e.origin === rel.table
    ) {
      band = true;
    }
  });

  if (!band) {
    rela.push({
      table: rel.origin,
      relation: "1-1",
      origin: rel.table,
      joinColumn: rel.joinColumn ? false : true,
    });
  }
};

const manyToMany = (relations: RelationI[], rel: RelationI) => {
  let band = false;

  relations.map((e: RelationI) => {
    if (
      e.table === rel.origin &&
      e.relation === "N-M" &&
      e.origin === rel.table
    ) {
      band = true;
    }
  });

  if (!band) {
    rela.push({
      table: rel.origin,
      relation: "N-M",
      origin: rel.table,
      joinTable: rel.joinTable ? false : true,
    });
  }
};
