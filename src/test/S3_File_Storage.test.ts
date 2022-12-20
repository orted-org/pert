import { IFileStorage } from "../pkg/file_storage/file_storage";
import { LocalFileStorage } from "../pkg/file_storage/local_file_storage";
import { S3FileStorage } from "../pkg/file_storage/s3_file_storage";
import { RandomString } from "../util/random";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

let fileStorage: IFileStorage;
beforeAll(async () => {
  fileStorage = new S3FileStorage(
    process.env.S3_BUCKET || "",
    process.env.ACCESS_KEY_ID || "",
    process.env.ACCESS_KEY_SECRET || "",
    process.env.S3_REGION || ""
  );
});

jest.setTimeout(20000);
test("test all do", async () => {
  try {
    const localFileStorage = new LocalFileStorage();
    const imageFile = await localFileStorage.Get("./test_image.webp");

    const filePath = RandomString(10) + ".webp";
    await fileStorage.Put(filePath, imageFile);

    let ifFileExists = await fileStorage.IfFileExists(filePath);
    expect(ifFileExists).toBe(true);

    await fileStorage.Delete(filePath);
    ifFileExists = await fileStorage.IfFileExists(filePath);
    expect(ifFileExists).toBe(false);
  } catch (err) {
    expect(err).toBe(null);
  }
});
