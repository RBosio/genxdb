#!/usr/bin/env node

import shelljs from "shelljs";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";
import { join } from "path";

import jsonFile from "jsonfile";

const questions = [
  {
    name: "type",
    type: "list",
    message: "Type",
    choices: ["Rest API", "GraphQL"],
  },
  {
    name: "orm",
    type: "list",
    message: "ORM",
    choices: ["TypeORM", "Sequelize"],
  },
  {
    name: "file",
    type: "list",
    message: "Project",
    choices: ["Javascript", "Typescript"],
  },
  {
    name: "src",
    type: "input",
    message: "Src dir? (Y/N)",
  },
];

const init = async () => {
  console.clear();
  console.log(
    chalk.green(
      figlet.textSync("GenYDB", {
        // font: "Doh",
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 120,
        whitespaceBreak: true,
      })
    )
  );

  // const { type, orm, file, src } = await inquirer.prompt(questions);
  const path = join(shelljs.pwd().stdout, "gen.json");

  try {
    const data: databaseI = jsonFile.readFileSync(path);
    shelljs.mkdir("-p", "src/entities");

    data.database.map((table: tableDataI) => {
      shelljs.touch(
        join(shelljs.pwd().stdout, "src", "entities", `${table.name}.entity.ts`)
      );
    });
  } catch (error) {
    console.error(error);
  }
};

interface databaseI {
  version: string;
  database: tableDataI[];
}

interface tableDataI {
  name: string;
  columns: string[];
  primary: string;
  relations: string[];
}

init();
