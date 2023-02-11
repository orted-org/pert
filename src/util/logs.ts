/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, transports, Logger, format } from "winston";

export default class Logs {
  private static logger: Logger;

  private static SetLogger() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
    this.logger = createLogger({
      format: format.combine(format.json(), format.timestamp(), logFormat),
      transports: [new transports.Console()],
      exitOnError: false,
    });
  }

  public static ConfigureLogger() {
    this.SetLogger();
  }

  private static FormatMessage(message: string, extra?: any) {
    if (!extra) return message;
    if (typeof extra === "string") {
      return `${message}-  ${extra}`;
    } else {
      return `${message}-${JSON.stringify(extra)}`;
    }
  }

  public static debug(message: string, extra?: any) {
    this.logger.debug(this.FormatMessage(message, extra));
  }

  public static error(message: string, extra?: any) {
    this.logger.error(this.FormatMessage(message, extra));
  }

  public static warn(message: string, extra?: any) {
    this.logger.warn(this.FormatMessage(message, extra));
  }

  public static info(message: string, extra?: any) {
    this.logger.info(this.FormatMessage(message, extra));
  }
}
