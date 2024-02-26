import { DataTableI } from "../interfaces/dataTable.js";
import { setHeader } from "./header.js";
import { relations } from "./relations.js";
import { template } from "./template2.js";

export const TypeORM = async (
  table: DataTableI
): Promise<string[] | undefined> => {
  try {
    const header = setHeader(table);

    const body = template(table);

    let rel: string[] = [];

    if (table.relations) {
      rel = relations(table);
    }

    let data = [];
    if (rel.length > 0) {
      data = header.concat(body, "", rel.join(""), "}");
    } else {
      data = header.concat(body, "\n}");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
