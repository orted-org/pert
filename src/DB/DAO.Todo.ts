import { DB } from "./DB.DB";
import { MTodo } from "./DB.Models";

// all the queries
const _query = {
  Create: `INSERT INTO todo (id, title, description, status, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, description, status, updated_at`,
  GetAll: `SELECT id, title, description, status, updated_at FROM todo`,
  Delete: `DELETE FROM todo WHERE id=$1`,
};

// interface of the DAO
interface ITodoStore {
  Create: (teamData: ICreateTodoParams) => Promise<MTodo>;
  GetAll: () => Promise<MTodo[]>;
  Delete: (id: string) => Promise<void>;
}

// interface for input and output
interface ICreateTodoParams extends MTodo {}

// DAO definition
class TodoDAO implements ITodoStore {
  private db: DB;
  constructor(db: DB) {
    this.db = db;
  }
  Create(teamData: ICreateTodoParams): Promise<MTodo> {
    return this.db.QueryRow<MTodo>(_query.Create, [
      teamData.id,
      teamData.title,
      teamData.description,
      teamData.status,
      teamData.updated_at,
    ]);
  }
  GetAll(): Promise<MTodo[]> {
    return this.db.Query<MTodo>(_query.GetAll, []);
  }
  Delete(id: string) {
    return this.db.Exec(_query.Delete, [id]);
  }
}

export { TodoDAO, ITodoStore };
