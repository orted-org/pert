require("dotenv").config();

class ConfClass {
  private conf: string;
  constructor(conf: string) {
    this.conf = conf;
  }
  getString(): string {
    return this.conf as string;
  }
  getNumber(): number {
    return Number(this.conf);
  }
  getBoolean(): boolean {
    return this.conf === "true";
  }
}
function getConf(key: string): ConfClass | undefined {
  if (typeof process.env[key] === "undefined") {
    console.log(`Environment variable ${key} is not set.`);
    return undefined;
  }
  return new ConfClass(process.env[key] as string);
}

interface IConf {
  primaryInfo: {
    isDevMode: boolean;
    forWeb: boolean;
    serverPort: number;
  };
  connectivity: {
    reactUrl: string;
    redisPort: number;
    redisUri: string;
    postgresHost: string;
    postgresPort: number;
    postgresUser: string;
    postgresDB: string;
    postgresPassword: string;
    postgresReconnectRetries: number;
    redisReconnectRetries: number;
  };
}
const Conf: IConf = {
  primaryInfo: {
    isDevMode: !((getConf("NODE_ENV")?.getString() || "") === "production"),
    forWeb: getConf("IS_WEB")?.getBoolean() || false,
    serverPort: getConf("SERVER_PORT")?.getNumber() || 3000,
  },
  connectivity: {
    reactUrl: getConf("REACT_URL")?.getString() || "http://localhost:3000",
    redisPort: getConf("REDIS_PORT")?.getNumber() || 6379,
    redisUri: getConf("REDIS_URI")?.getString() || "redis",
    postgresHost: getConf("POSTGRES_HOST")?.getString() || "localhost",
    postgresPort: getConf("POSTGRES_PORT")?.getNumber() || 5432,
    postgresUser: getConf("POSTGRES_USER")?.getString() || "hs",
    postgresDB: getConf("POSTGRES_DB")?.getString() || "todo_db",
    postgresPassword: getConf("POSTGRES_PASSWORD")?.getString() || "mypassword",
    postgresReconnectRetries: getConf("POSTGRES_RETRIES")?.getNumber() || 3,
    redisReconnectRetries: getConf("POSTGRES_RETRIES")?.getNumber() || 3,
  },
};

export { Conf, IConf };
