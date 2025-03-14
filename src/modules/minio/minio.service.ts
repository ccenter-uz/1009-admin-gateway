import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import * as Multer from 'multer';
import * as mime from 'mime-types';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Client;

  onModuleInit() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: +process.env.MINIO_PORT || 9000,
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY || 'GgfXa2vCuLrCyOZBmNZE',
      secretKey:
        process.env.MINIO_SECRET_KEY ||
        'APEv4lmHcsjrM9LjonzaUWuws7Ygqrk5eRj4JNpO',
    });
  }

  async upload(bucketName: string, file: Multer.File) {
    const fileName = `${Date.now()}-${file.originalname}`;
    const contentType =
      mime.lookup(file.originalname) || 'application/octet-stream';

    await this.minioClient.putObject(
      bucketName,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': contentType }
    );

    // return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;

    return `http://localhost:9000/test/${fileName}`;
  }

  async uploadFiles(
    files: Array<Multer.File>,
    bucketName: string = 'test',
  ): Promise<{ link: string }[]> {
    const uploadedLinks: { link: string }[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const contentType =
        mime.lookup(file.originalname) || 'application/octet-stream';

      await this.minioClient.putObject(
        bucketName,
        fileName,
        file.buffer,
        file.size,
        { 'Content-Type': contentType }
      );

      uploadedLinks.push({
        link: `http://localhost:9000/test/${fileName}`,
      });
    }

    return uploadedLinks;
  }

  async remove(bucketName: string, fileName: string) {
    await this.minioClient.removeObject(bucketName, fileName);
  }
}
