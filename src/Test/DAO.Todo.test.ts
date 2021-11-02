import ConnectToDB from "../Helpers/Helper.DBInit";
import App from "../HTTP/App";
import { Conf } from "../HTTP/ConfigInit";
let app: App;
beforeAll(async () => {
  const conf = Conf;
  const db = await ConnectToDB(conf);
  app = new App(db, conf);
});

afterAll(async () => {
  app.ShutDown();
  console.log("Closed DB Connection");
});

test("test create todo item", async () => {
  try {
    const arg = {
      id: "1",
      title: "first todo",
      description: "first description",
      status: false,
      updated_at: new Date(),
    };
    const i = await app.TodoDAO.Create(arg);

    expect(i.id).toBe(arg.id);
    expect(i.title).toBe(arg.title);
    expect(i.description).toBe(arg.description);
    expect(i.status).toBe(arg.status);
    expect(i.updated_at).toStrictEqual(arg.updated_at);
  } catch (err) {
    expect(err).toBeNull();
  }
});
