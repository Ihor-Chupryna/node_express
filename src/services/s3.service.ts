import { randomUUID } from "node:crypto";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { config } from "../configs/config";

class S3Service {
  constructor(
    private readonly client = new S3Client({
      region: config.AWS_S3_REGION,
      credentials: {
        accessKeyId: config.AWS_S3_ACCESS_KEY,
        secretAccessKey: config.AWS_S3_SECRET_KEY,
      },
    }),
  ) {}
  public async uploadFile(
    file: UploadedFile,
    folder: "user",
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(folder, itemId, file.name);
      await this.client.send(
        new PutObjectCommand({
          Bucket: config.AWS_S3_BUCKET_NAME,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: "public-read",
        }),
      );

      return filePath;
    } catch (err) {
      console.error("Error upload: ", err);
    }
  }
  private buildPath(folder: string, itemId: string, fileName: string): string {
    return `${folder}/${itemId}/${randomUUID()}${path.extname(fileName)}`;
  }
}
export const s3Service = new S3Service();
