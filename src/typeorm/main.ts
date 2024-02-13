import jsonFile from "jsonfile";
import { writeFile } from "fs";
import { join } from "path";
import shelljs from "shelljs";

import { DataTableI } from "../interfaces/dataTable.js";
import { DatabaseI } from "../interfaces/database.js";
import { setHeader } from "./header.js";
import { formatBody } from "./lib.js";
import { relations } from "./relations.js";
import { template } from "./template.js";

export const TypeORM = async (
  entityPath: string,
  sourceFilePath: string
) => {
  try {
    const data: DatabaseI = await jsonFile.readFile(sourceFilePath);

    data.database.map((table: DataTableI) => {
      const path = join(entityPath, `${table.name}.entity.ts`);
      shelljs.touch(path);

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

      const t = writeFile(path, data, (error) => {
        if (error) console.error(error);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
