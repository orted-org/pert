import redis, { RedisClient } from "redis";
import { IConf } from "../../HTTP/ConfigInit";

function ConnectToRedis(conf: IConf): Promise<RedisClient> {
  return new Promise<RedisClient>(async (resolve, reject) => {
    const retries = conf.connectivity.postgresReconnectRetries;
    let i = 0;
    while (true) {
      const client = redis.createClient({
        host: conf.connectivity.redisUri,
        port: conf.connectivity.redisPort,
      });

      // redis client connected
      client.on("connect", () => {
        console.log("Connected To Redis");
      });

      // redis client ready to use
      client.on("ready", () => {
        console.log("Redis ready to use");
        return resolve(client);
      });

      // redis client threw error
      client.on("error", (err) => {
        console.log(err.message);
        i++;
        if (i === retries) {
          return reject(err);
        }
      });

      // redis client connection end
      client.on("end", () => {
        console.log("Redis disconnected");
      });
    }
  });
}
export default ConnectToRedis;
