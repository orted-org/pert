import { PrismaClient } from "@prisma/client";
import TodoManager from "../../internal/todo_manager/todo_manager";
import { IFileStorage } from "../../pkg/file_storage/file_storage";
import { LocalFileStorage } from "../../pkg/file_storage/local_file_storage";
import { S3FileStorage } from "../../pkg/file_storage/s3_file_storage";
import { ImageResolver } from "../../pkg/image_resolver/image_resolver_";
import Logs from "../../util/logs";

export interface IAPIDependencies {
  db: PrismaClient;
  imageResolver: ImageResolver;
  localFileStorage: IFileStorage;
  remoteFileStorage: IFileStorage;
  todoManager: TodoManager;
}

export async function InitiateDependencies(): Promise<IAPIDependencies> {
  Logs.ConfigureLogger();

  // DB
  const client = new PrismaClient();
  await client.$connect();
  Logs.info("connected to db");

  //S3
  const s3 = new S3FileStorage(
    process.env.S3_BUCKET || "",
    process.env.ACCESS_KEY_ID || "",
    process.env.ACCESS_KEY_SECRET || "",
    process.env.S3_REGION || ""
  );

  // imageResolver
  const imageResolver = new ImageResolver({ h: 400, w: 400 }, "jpg");

  // localFileStorage
  const localFileStorage = new LocalFileStorage();

  const todoManager = new TodoManager(client);

  const deps: IAPIDependencies = {
    db: client,
    imageResolver: imageResolver,
    localFileStorage: localFileStorage,
    remoteFileStorage: s3,
    todoManager: todoManager,
  };

  return deps;
}

// async function ShutdownDependencies(): Promise<void> {
//   return new Promise((resolve, reject) => {});
// }
