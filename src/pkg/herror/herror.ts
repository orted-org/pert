import { HerrorStatus } from "./status_codes";

export class Herror {
  status: number;
  message: string;
  extra?: any;
  constructor(message: string, status: HerrorStatus, extra?: any) {
    this.status = status;
    this.message = message;
    this.extra = extra;
  }
}
