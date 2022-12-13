import { Logger } from "../util/logger";

beforeAll(async () => {
  Logger.configureLogger();
});

test("test logger", async () => {
  Logger.info("Hey info log", null);
  Logger.error("Hey error log", null);
  Logger.info("Hey debug log", { value: 1 });
});
