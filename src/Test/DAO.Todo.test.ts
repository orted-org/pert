import { DB } from "../DB/DB.DB";
import ConnectToDB from "../Helpers/Connectors/ConnectDB";
import { Conf } from "../HTTP/ConfigInit";
let db: DB;
beforeAll(async () => {
  const conf = Conf;
  db = await ConnectToDB(conf);
  // TODO: Fix for unit testing single components
});

afterAll(async () => {
  db.Close();
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
    const i = await db.Todo.Create(arg);

    expect(i.id).toBe(arg.id);
    expect(i.title).toBe(arg.title);
    expect(i.description).toBe(arg.description);
    expect(i.status).toBe(arg.status);
    expect(i.updated_at).toStrictEqual(arg.updated_at);
  } catch (err) {
    expect(err).toBeNull();
  }
});
