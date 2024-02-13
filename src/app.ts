import shelljs from "shelljs";
import inquirer from "inquirer";
import { join } from "path";
import { writeFile } from "fs";
import jsonFile from "jsonfile";

import { template } from "./typeorm/template.js";
import { databaseI } from "./interfaces/database.js";
import { tableDataI } from "./interfaces/dataTable.js";
import { formatBody } from "./typeorm/lib.js";
import { setHeader } from "./typeorm/header.js";
import {
  manyToMany,
  manyToOne,
  oneToMany,
  oneToOne,
} from "./typeorm/relations.js";
import { RelationI } from "./interfaces/relations.js";
import { TypeORM } from "./typeorm/main.js";

export const app = async () => {
  const entityPath = join(shelljs.pwd().stdout, "src", "entities");
  shelljs.rm("-rf", entityPath);

  // const { type, orm, file, src } = await inquirer.prompt(questions);
  const sourceFilePath = join(shelljs.pwd().stdout, "gen.json");

  try {
    const data: databaseI = await jsonFile.readFile(sourceFilePath);
    shelljs.mkdir("-p", "src/entities");

    data.database.map((table: tableDataI) => {
      const path = join(entityPath, `${table.name}.entity.ts`);
      shelljs.touch(path);

      const data = TypeORM(table);

      writeFile(path, data, (error) => {
        if (error) console.error(error);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
