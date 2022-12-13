export interface Mailer {
  Send(from: string, to: string, subject: string, body: string): Promise<void>;
  Close(): void;
}
