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
