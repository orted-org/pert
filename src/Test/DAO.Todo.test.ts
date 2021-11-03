import { DB } from "../DB/DB.DB";
import ConnectToDB from "../Helpers/Connectors/ConnectDB";
import { RandomString } from "../Helpers/Generators/Random";
import NewV4UUID from "../Helpers/Wrapper/UUID";
import { Conf } from "../HTTP/ConfigInit";
let db: DB;
beforeAll(async () => {
  const conf = Conf;
  db = await ConnectToDB(conf);
});

afterAll(async () => {
  db.Close();
  console.log("Closed DB Connection");
});

async function createRandomTodo() {
  try {
    const arg = {
      id: NewV4UUID(),
      title: RandomString(10),
      description: RandomString(20),
      updated_at: new Date(),
    };
    const i = await db.Todo.Create(arg);

    expect(i.id).toBe(arg.id);
    expect(i.title).toBe(arg.title);
    expect(i.description).toBe(arg.description);
    expect(i.status).toBe(false);
    expect(i.updated_at).toStrictEqual(arg.updated_at);
    return i;
  } catch (err) {
    throw err;
  }
}

test("test create todo item", async () => {
  try {
    const i = await createRandomTodo();
    expect(i).not.toBe(undefined);
  } catch (err) {
    expect(err).toBe(null);
  }
});

test("test get all todo items", async () => {
  try {
    // creating at least one todo item
    const i = await createRandomTodo();

    const allTodo = await db.Todo.GetAll();

    // checking if there is at least one todo
    expect(allTodo.length).toBeGreaterThan(0);
  } catch (err) {
    expect(err).toBe(null);
  }
});

test("test delete todo", async () => {
  try {
    // creating a todo
    const i = await createRandomTodo();

    // deleting that todo
    await db.Todo.Delete(i.id);

    const allTodo = await db.Todo.GetAll();

    let found = false;
    for (let j = 0; j < allTodo.length; j++) {
      if (allTodo[j].id === i.id) {
        found = true;
        break;
      }
    }
    expect(found).toBe(false);
  } catch (err) {
    expect(err).toBe(null);
  }
});
