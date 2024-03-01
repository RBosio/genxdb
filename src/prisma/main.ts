import { DataTableI } from "../interfaces/dataTable.js";
import { RelationI } from "../interfaces/relations.js";

import { getName } from "../lib/getNames.js";
import { relations } from "./relations.js";
import { template } from "./template.js";

export const Prisma = async (
  table: DataTableI,
  r: RelationI[]
): Promise<string[] | undefined> => {
  try {
    const relationsTable: RelationI[] = r.filter(
      (t) => t.origin === table.name
    );

    const header = [`model ${getName(table.name)} {`];
    const body = template(table);

    let rel: string[] = [];

    /*
    if (relationsTable) {
      rel = relations(relationsTable);
    }
    */

    let data = [];
    if (rel.length > 0) {
      data = header.concat(body, rel.join("\n\n"), "}");
    } else {
      data = header.concat(body, "}\n\n");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
