#!/usr/bin/env node

import shelljs from "shelljs";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

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
};

init();
