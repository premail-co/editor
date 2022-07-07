import colors from "colors";
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
          message = colors.blue(message);
          break;

        case "WARN":
          message = colors.yellow(message);
          break;

        case "ERROR":
          message = colors.red(message);
          break;
        case "DEBUG":
          message = colors.green(message);
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
