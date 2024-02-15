import jsonFile from "jsonfile";
import shelljs from "shelljs";
import inquirer from "inquirer";
import { join } from "path";

import { TypeORM } from "./typeorm/main.js";
import { questions } from "./questions.js";
import { DatabaseI } from "./interfaces/database.js";

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

      TypeORM(data, entityPath);
    }
  } catch (error) {
    console.error(error);
  }
};
