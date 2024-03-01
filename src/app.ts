import jsonFile from "jsonfile";
import shelljs from "shelljs";
import inquirer from "inquirer";
import { join } from "path";
import { writeFile } from "fs";

import { TypeORM } from "./typeorm/main.js";
import { questions } from "./questions.js";
import { DatabaseI } from "./interfaces/database.js";
import { DataTableI } from "./interfaces/dataTable.js";
import { formatRelations } from "./lib/formatRelations.js";
import { Prisma } from "./prisma/main.js";

export const app = async () => {
  const { src, orm } = await inquirer.prompt(questions);
  const sourceFilePath = join(shelljs.pwd().stdout, "genxdb.json");
  let entityPath = "";

  if (orm === "TypeORM") {
    if (src.toLowerCase() !== "n") {
      entityPath = join(shelljs.pwd().stdout, "src", "entities");
      shelljs.rm("-rf", entityPath);

      shelljs.mkdir("-p", "src/entities");
    } else {
      entityPath = join(shelljs.pwd().stdout, "entities");
      shelljs.rm("-rf", entityPath);

      shelljs.mkdir("-p", "entities");
    }
  } else if (orm === "Prisma") {
    shelljs.mkdir("-p", "prisma");
  }

  try {
    const data: DatabaseI = await jsonFile.readFile(sourceFilePath);

    if (data.database) {
      const rel = formatRelations(data);

      try {
        data.database?.map(async (table: DataTableI) => {
          let path: string | undefined;
          let data: string[] | undefined;

          if (orm === "TypeORM") {
            path = join(entityPath, `${table.name}.entity.ts`);
          }
          if (orm === "Prisma") {
            path = join(shelljs.pwd().stdout, "prisma", "schema.prisma");
          }

          if (orm === "TypeORM") {
            data = await TypeORM(table, rel);
          }
          if (orm === "Prisma") {
            data = await Prisma(table, rel);
          }

          if (data && path) {
            const t = writeFile(
              path,
              data.join("\n"),
              { flag: `${orm === "Prisma" ? "a+" : ""}` },
              (error) => {
                if (error) console.error(error);
              }
            );
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
