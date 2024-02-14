import chalk from "chalk";
import figlet from "figlet";

export const setTitle = () => {
  console.log(
    chalk.green(
      figlet.textSync("GenXDB", {
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};
