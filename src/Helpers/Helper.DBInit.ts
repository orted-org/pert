import { Pool } from "pg";
import { DB } from "../DB/DB.Engine";
import { IConf } from "../HTTP/ConfigInit";

async function ConnectToDB(conf: IConf): Promise<DB> {
  const pool = new Pool({
    user: conf.connectivity.postgresUser,
    password: conf.connectivity.postgresPassword,
    host: conf.connectivity.postgresHost,
    port: conf.connectivity.postgresPort,
    database: conf.connectivity.postgresDB,
  });
  while (true) {
    try {
      const client = await pool.connect();
      const db = new DB(client);
      console.log("Connected To DB");
      return db;
    } catch (err) {
      console.log("Failed Connecting To DB, retrying");
      console.log(err);
      await new Promise((res) => setTimeout(res, 3000));
    }
  }
}

export default ConnectToDB;
