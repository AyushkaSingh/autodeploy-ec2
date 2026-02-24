import chalk from "chalk";

export const log = {
  info: (msg) => console.log(chalk.blue(msg)),
  success: (msg) => console.log(chalk.green(msg)),
  error: (msg) => console.log(chalk.red(msg)),
  warn: (msg) => console.log(chalk.yellow(msg)),
};