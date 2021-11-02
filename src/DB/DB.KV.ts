import { RedisClient } from "redis";
import {
  RedisSet,
  RedisGet,
  RedisDel,
  RedisTruncate,
} from "../Helpers/Wrapper/Redis";

interface IKVStore {
  Set: (key: string, value: string, expiryTime: number) => Promise<void>;
  Get: (key: string) => Promise<string | null>;
  Delete: (key: string) => Promise<void>;
  Truncate: () => Promise<void>;
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
  Truncate(): Promise<void> {
    return RedisTruncate(this.conn);
  }
}

export { KV, IKVStore };
