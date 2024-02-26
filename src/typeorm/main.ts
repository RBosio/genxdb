import { DataTableI } from "../interfaces/dataTable.js";
import { RelationI } from "../interfaces/relations.js";
import { setHeader } from "./header.js";
import { getName } from "./lib.js";
import { relations } from "./relations.js";
import { template } from "./template.js";

export const TypeORM = async (
  table: DataTableI,
  r: RelationI[]
): Promise<string[] | undefined> => {
  try {
    const relationsTable: RelationI[] = r.filter(
      (t) => t.origin === table.name
    );

    const header = setHeader(relationsTable).concat([
      `export class ${getName(table.name)} {`,
    ]);

    const body = template(table);

    let rel: string[] = [];

    if (relationsTable) {
      rel = relations(relationsTable);
    }

    let data = [];
    if (rel.length > 0) {
      data = header.concat(body, "", rel.join("\n\n"), "}");
    } else {
      data = header.concat(body, "\n}");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
