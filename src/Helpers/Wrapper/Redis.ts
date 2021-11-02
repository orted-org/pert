import { RedisClient } from "redis";

function RedisSet(
  client: RedisClient,
  key: string,
  value: string,
  expiryTime: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    client.SET(key, value, "EX", expiryTime, (err, reply) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

function RedisGet(client: RedisClient, key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    client.GET(key, (err, reply) => {
      if (err) return reject(err);
      return resolve(reply);
    });
  });
}

function RedisDel(client: RedisClient, key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    client.DEL(key, (err, reply) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

function RedisTruncate(client: RedisClient): Promise<void> {
  return new Promise((resolve, reject) => {
    client.flushdb((err, reply) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

export { RedisSet, RedisGet, RedisDel, RedisTruncate };
