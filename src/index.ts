#!/usr/bin/env node

import shelljs from "shelljs";
import inquirer from "inquirer";
import { join } from "path";
import { writeFile } from "fs";
import jsonFile from "jsonfile";

import { template } from "./template.js";
import { databaseI } from "./interfaces/database.js";
import { tableDataI } from "./interfaces/dataTable.js";
import { setTitle } from "./title.js";

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

  setTitle();

  const entityPath = join(shelljs.pwd().stdout, "src", "entities");
  shelljs.rm("-rf", entityPath);

  // const { type, orm, file, src } = await inquirer.prompt(questions);
  const path = join(shelljs.pwd().stdout, "gen.json");

  try {
    const data: databaseI = await jsonFile.readFile(path);
    shelljs.mkdir("-p", "src/entities");

    data.database.map((table: tableDataI) => {
      const path = join(
        shelljs.pwd().stdout,
        "src",
        "entities",
        `${table.name}.entity.ts`
      );

      shelljs.touch(path);

      const text = template(table);

      let body = text
        .split("\n")
        .filter((_, idx: number) => idx < text.split("\n").length - 2)
        .map((s) => (s.includes(",") && !s.includes("a") ? "" : s))
        .join("\n");

      const header = `import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class ${(table.name.match(/[a-zA-Z0-9]+/g) || [])
        .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
        .join("")} {`;

      writeFile(path, header.concat(body, "\n}"), (error) => {
        if (error) console.error(error);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

init();
