import { PrismaClient } from "@prisma/client";
import TodoManager from "../../internal/todo_manager/todo_manager";
import { IFileStorage } from "../../pkg/file_storage/file_storage";
import { LocalFileStorage } from "../../pkg/file_storage/local_file_storage";
import { S3FileStorage } from "../../pkg/file_storage/s3_file_storage";
import { ImageResolver } from "../../pkg/image_resolver/image_resolver_";
import { Logger } from "../../util/logger";

export interface IAPIDependencies {
  db: PrismaClient;
  imageResolver: ImageResolver;
  localFileStorage: IFileStorage;
  remoteFileStorage: IFileStorage;
  todoManager: TodoManager;
}

export async function InitiateDependencies(): Promise<IAPIDependencies> {
  return new Promise(async (resolve, reject) => {
    // DB
    const client = new PrismaClient();
    let i = 0;
    try {
      await client.$connect();
      Logger.info("connected to db...");
    } catch (err) {
      return reject(err);
    }

    //S3
    const s3 = new S3FileStorage(
      (process.env as any).S3_BUCKET,
      (process.env as any).ACCESS_KEY_ID,
      (process.env as any).ACCESS_KEY_SECRET,
      (process.env as any).S3_REGION
    );

    // imageResolver
    const imageResolver = new ImageResolver({ h: 400, w: 400 }, "jpg");

    // localFileStorage
    const localFileStorage = new LocalFileStorage();

    // todoManager
    const todoManager = new TodoManager(client);

    const deps: IAPIDependencies = {
      db: client,
      imageResolver: imageResolver,
      localFileStorage: localFileStorage,
      remoteFileStorage: s3,
      todoManager: todoManager,
    };

    return resolve(deps);
  });
}

async function ShutdownDependencies(): Promise<void> {
  return new Promise((resolve, reject) => {});
}
