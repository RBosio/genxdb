#!/usr/bin/env node

import shelljs from "shelljs";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

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

  const { type, orm, file, src } = await inquirer.prompt(questions);
};

init();
