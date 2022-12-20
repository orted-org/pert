/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, transports, Logger as WLogger, format } from "winston";
import path from "path";
import fs from "fs";
import "winston-daily-rotate-file";

export class Logger {
  private static logger: WLogger;
  private static logDirectory = path.join(process.cwd(), "logs");

  private static CreateLogFolderIfNotExists() {
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory);
    }
  }

  private static SetLogger() {
    const logFormat = format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    });
    this.logger = createLogger({
      format: format.combine(format.json(), format.timestamp(), logFormat),
      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          filename: path.join(Logger.logDirectory, "starter-%DATE%.log"),
          datePattern: "YYYY-MM-DD-HH",
          frequency: "1h",
          maxSize: "1g",
          level: "verbose",
        }),
      ],
      exitOnError: false,
    });
  }

  public static configureLogger() {
    this.CreateLogFolderIfNotExists();
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
