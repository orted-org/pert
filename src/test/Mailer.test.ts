import { Mailer } from "../pkg/mailer/mailer";
import { NodeMailer } from "../pkg/mailer/node_mailer";
import { Logger } from "../util/logger";
let mailer: Mailer;
beforeAll(async () => {
  mailer = new NodeMailer(
    "outlook.com",
    587,
    "something@outlook.com",
    "secret"
  );
});

afterAll(async () => {
  if (mailer != undefined) mailer.Close();
  console.log("mailer closed");
});

test("test mailer send", async () => {
  jest.setTimeout(15000);
  try {
    await mailer.Send(
      "something@outlook.com",
      "someone@gmail.com",
      "Hey There!",
      "How are you doing?"
    );
  } catch (err) {
    expect(err).toBe(null);
  }
});
