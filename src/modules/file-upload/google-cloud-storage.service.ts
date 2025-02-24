import { Injectable } from '@nestjs/common';
import * as Multer from 'multer';
import { keyFilename } from 'src/common/config/app.config';
import { extname, join } from 'path';
import { v4 } from 'uuid';
import { Storage, Bucket } from '@google-cloud/storage';

@Injectable()
export class GoogleCloudStorageService {
  private readonly storage: Storage;
  private readonly bucketName = 'telecom2003';
  private readonly bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      keyFilename: keyFilename,
    });
    this.bucket = this.storage.bucket(this.bucketName);
  }

  async upload(file: any | any[]): Promise<string> {
    const a: any[] = [];
    a.push(file);
    const imageLink = join(v4() + extname(a[0]?.originalname));
    const blob = this.bucket.file(imageLink);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {});

    blobStream.end(a[0]?.buffer);
    return imageLink;
  }

  async uploadFiles(files: Array<Multer.File>): Promise<{ link: string }[]> {
    const uploadedLinks: { link: string }[] = [];

    for (const file of files) {
      const imageLink = join(v4() + extname(file.originalname));
      const blob = this.bucket.file(imageLink);
      const blobStream = blob.createWriteStream();

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Blob stream error:', err);
          reject(err); // Add this in your Promise block
        });

        blobStream.on('finish', () => {
          resolve(true);
        });

        blobStream.end(file.buffer);
      });

      uploadedLinks.push({
        link: `https://storage.googleapis.com/${this.bucketName}/${imageLink}`,
      });
    }

    return uploadedLinks;
  }
}
