import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'minio';
import * as Multer from 'multer';
import * as mime from 'mime-types';
import { MinioConfig } from '../../common/config/app.config';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Client;

  onModuleInit() {
    this.minioClient = new Client({
      endPoint: MinioConfig.host,
      port: MinioConfig.port,
      useSSL: MinioConfig.useSSL,
      accessKey: MinioConfig.accessKey,
      secretKey: MinioConfig.secretKey,
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

    return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`;
  }

  async uploadFiles(
    files: Array<Multer.File>,
    bucketName: string = 'test'
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
        link: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${fileName}`,
      });
    }

    return uploadedLinks;
  }

  async remove(bucketName: string, fileName: string) {
    await this.minioClient.removeObject(bucketName, fileName);
  }
}
