import { tableDataI } from "../interfaces/dataTable.js";
import { setHeader } from "./header.js";
import { formatBody } from "./lib.js";
import { relations } from "./relations.js";
import { template } from "./template.js";

export const TypeORM = (table: tableDataI): string => {
  const header = setHeader(table);

  const text = template(table);
  const body = formatBody(text);

  let rel: string[] = [];
  if (table.relations) {
    rel = relations(table);
  }

  let data = "";
  if (rel.length > 0) {
    data = header.concat(body, "\n\n", rel.join("\n"), "}");
  } else {
    data = header.concat(body, "\n}");
  }

  return data;
};
