import { Pool } from "pg";
import { DB } from "../../DB/DB.DB";
import { IConf } from "../../HTTP/ConfigInit";

function ConnectToDB(conf: IConf): Promise<DB> {
  return new Promise<DB>(async (resolve, reject) => {
    const retries = conf.connectivity.postgresReconnectRetries;
    const pool = new Pool({
      user: conf.connectivity.postgresUser,
      password: conf.connectivity.postgresPassword,
      host: conf.connectivity.postgresHost,
      port: conf.connectivity.postgresPort,
      database: conf.connectivity.postgresDB,
    });
    let i = 0;
    while (true) {
      try {
        const client = await pool.connect();
        const db = new DB(client);
        console.log("Connected To DB");
        return resolve(db);
      } catch (err) {
        i++;
        console.log("Failed Connecting To DB, retrying");
        console.log(err);
        if (i === retries) return reject(err);
        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  });
}

export default ConnectToDB;
