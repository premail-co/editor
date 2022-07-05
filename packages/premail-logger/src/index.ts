import chalk from "chalk";
import winston from "winston";

const options: winston.LoggerOptions = {
  format: winston.format.combine(
    winston.format.timestamp(),

    winston.format.printf((info) => {
      const levelUpper = info.level.toUpperCase();
      let message = `${info.timestamp} | ${info.level} ${
        info.service ? ` | ${info.service} ` : ``
      }| ${info.message}`;

      switch (levelUpper) {
        case "INFO":
          message = chalk.blue(message);
          break;

        case "WARN":
          message = chalk.yellow(message);
          break;

        case "ERROR":
          message = chalk.red(message);
          break;
        case "DEBUG":
          message = chalk.green(message);
          break;

        default:
          break;
      }

      return message;
    })
  ),

  transports: [new winston.transports.Console()],
};
const winstonLogger = winston.createLogger(options);

const createServiceLogger = (service: string) => {
  const opts = { ...options };
  opts.defaultMeta = { service };
  return winston.createLogger(opts);
};

export default winstonLogger;
export { createServiceLogger };
