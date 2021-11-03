import { PoolClient } from "pg";
import DBError from "../Helpers/ErrorHandling/DBError";
import { ITodoStore, TodoDAO } from "./DAO.Todo";

interface IDB {
  Exec: (query: string, arg: any[]) => Promise<void>;
  QueryRow: <T>(query: string, arg: any[]) => Promise<T>;
  Query: <T>(query: string, arg: any[]) => Promise<T[]>;
  Todo: ITodoStore;
}
class DB implements IDB {
  private conn: PoolClient;
  Todo: ITodoStore = new TodoDAO(this);
  constructor(conn: PoolClient) {
    this.conn = conn;
  }
  Close() {
    this.conn.release(true);
  }
  Exec(query: string, arg: any[]): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.conn.query(query, arg);
        return resolve();
      } catch (err) {
        return reject(err);
      }
    });
  }
  QueryRow<T>(query: string, arg: any[]): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const data = await this.conn.query(query, arg);
        return resolve(data.rows[0] as T);
      } catch (err) {
        return reject(err);
      }
    });
  }
  Query<T>(query: string, arg: any[]): Promise<T[]> {
    return new Promise<T[]>(async (resolve, reject) => {
      try {
        const data = await this.conn.query(query, arg);
        return resolve(data.rows as T[]);
      } catch (err) {
        return reject(err);
      }
    });
  }
}

export { DB };
