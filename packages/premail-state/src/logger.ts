import { createServiceLogger } from "@premail/logger";

const logger = createServiceLogger(require("../package.json").name);

export { logger };
