import chalk from "chalk";

class Logger {
  name = "SNAILY_CAD";

  info(message: string) {
    const info = chalk.yellow("info");

    console.info(`${this.name}: ${info} - ${message}`);
  }

  warn(message: string) {
    const warn = chalk.yellow("warn");

    console.warn(`${this.name}: ${warn} - ${message}`);
  }
}

export const logger = new Logger();
