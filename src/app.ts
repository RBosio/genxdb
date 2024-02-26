import jsonFile from "jsonfile";
import shelljs from "shelljs";
import inquirer from "inquirer";
import { join } from "path";
import { writeFile } from "fs";

import { TypeORM } from "./typeorm/main.js";
import { questions } from "./questions.js";
import { DatabaseI } from "./interfaces/database.js";
import { DataTableI } from "./interfaces/dataTable.js";
import { formatRelations } from "./typeorm/lib.js";

export const app = async () => {
  const { src } = await inquirer.prompt(questions);
  const sourceFilePath = join(shelljs.pwd().stdout, "genxdb.json");
  let entityPath = "";

  try {
    const data: DatabaseI = await jsonFile.readFile(sourceFilePath);

    if (data.database) {
      if (src.toLowerCase() !== "n") {
        entityPath = join(shelljs.pwd().stdout, "src", "entities");
        shelljs.rm("-rf", entityPath);

        shelljs.mkdir("-p", "src/entities");
      } else {
        entityPath = join(shelljs.pwd().stdout, "entities");
        shelljs.rm("-rf", entityPath);

        shelljs.mkdir("-p", "entities");
      }

      let relations: any[] = [];

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

      const rel = formatRelations(relations);

      try {
        data.database?.map(async (table: DataTableI) => {
          const path = join(entityPath, `${table.name}.entity.ts`);
          shelljs.touch(path);

          const data = await TypeORM(table);

          if (data) {
            const t = writeFile(path, data.join("\n"), (error) => {
              if (error) console.error(error);
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
};
