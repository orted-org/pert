import { RedisClient } from "redis";

function Set(
  client: RedisClient,
  key: string,
  value: string,
  expiryTime: number
) {
  return new Promise((resolve, reject) => {
    client.SET(key, value, "EX", expiryTime, (err, reply) => {
      if (err) return reject(err);
      resolve(reply);
    });
  });
}

function Get(client: RedisClient, key: string) {
  return new Promise((resolve, reject) => {
    client.GET(key, (err, reply) => {
      if (err) return reject(err);
      return resolve(reply);
    });
  });
}

function Del(client: RedisClient, key: string) {
  return new Promise((resolve, reject) => {
    client.DEL(key, (err, reply) => {
      if (err) return reject(err);
      return resolve(reply);
    });
  });
}

export { Set, Get, Del };
