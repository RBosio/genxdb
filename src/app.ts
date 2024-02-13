import shelljs from "shelljs";
import inquirer from "inquirer";
import { join } from "path";

import { TypeORM } from "./typeorm/main.js";
import { questions } from "./questions.js";

export const app = async () => {
  const { src } = await inquirer.prompt(questions);
  let entityPath = "";

  if (src.toLowerCase() === "y") {
    entityPath = join(shelljs.pwd().stdout, "src", "entities");
    shelljs.rm("-rf", entityPath);

    shelljs.mkdir("-p", "src/entities");
  } else {
    entityPath = join(shelljs.pwd().stdout, "entities");
    shelljs.rm("-rf", entityPath);

    shelljs.mkdir("-p", "entities");
  }

  const sourceFilePath = join(shelljs.pwd().stdout, "gen.json");

  TypeORM(entityPath, sourceFilePath);
};
