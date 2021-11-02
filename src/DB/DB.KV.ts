import { PoolClient } from "pg";
import { RedisClient } from "redis";
import DBError from "../Helpers/ErrorHandling/DBError";
import { RedisSet, RedisGet, RedisDel } from "../Helpers/Wrapper/Redis";

interface IKVStore {
  Set: (key: string, value: string, expiryTime: number) => Promise<void>;
  Get: (key: string) => Promise<string | null>;
  Delete: (key: string) => Promise<void>;
}
class KV implements IKVStore {
  conn: RedisClient;
  constructor(conn: RedisClient) {
    this.conn = conn;
  }
  Close() {
    this.conn.quit();
  }
  Set(key: string, value: string, expiryTime?: number): Promise<void> {
    return RedisSet(this.conn, key, value, expiryTime || -1);
  }
  Get(key: string): Promise<string | null> {
    return RedisGet(this.conn, key);
  }
  Delete(key: string): Promise<void> {
    return RedisDel(this.conn, key);
  }
}

export { KV, IKVStore };
