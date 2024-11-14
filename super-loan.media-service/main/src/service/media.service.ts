import { IMediaRepository } from '@/repository/interface/i.media.repository';
import { IMediaService } from '@/service/interface/i.media.service';
import { inject, injectable } from 'inversify';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import BaseError from '@/utils/error/base.error';
import minioClient from '@/utils/minio-instance.util';
import { MediaUploadRes } from '@/dto/media-upload.res';
import { GlobalConfig } from '@/utils/config/global-config.util';
import { GetMediaUrlRes } from '@/dto/get-image-url.res';

@injectable()
export class MediaService implements IMediaService {
  private mediaRepository: IMediaRepository;
  private bucketName = 'superloan';
  private minioEndpoint = process.env.MINIO_ENDPOINT || '';

  constructor(@inject('MediaRepository') mediaRepository: IMediaRepository) {
    this.mediaRepository = mediaRepository;
  }

  async uploadImage(fileName: string, tempFilePath: string, mediaCategory: string): Promise<MediaUploadRes> {
    let existsFileName;

    try {
      existsFileName = await minioClient.getObject(this.bucketName, mediaCategory + '/' + fileName);
    } catch (error: any) {
      if (error.code === 'NoSuchKey') {
        console.log('error', error);
      } else {
        throw error;
      }
    }

    if (existsFileName) {
      throw new BaseError('FILE_EXISTS', 'File name already exists');
    }

    await minioClient.fPutObject(this.bucketName, mediaCategory + '/' + fileName, tempFilePath);

    // Xóa file tạm sau khi upload
    fs.unlink(tempFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting temp file:', unlinkErr);
      }
    });

    return {
      mediaUrl: `http://${this.minioEndpoint}/media/${this.bucketName}/${mediaCategory}/${fileName}`
    };
  }

  async getVideoUrl(mediaCategory: string): Promise<GetMediaUrlRes> {
    const fileName = uuidv4();
    return {
      mediaUrl: `http://${this.minioEndpoint}/media/${this.bucketName}/${mediaCategory}/${fileName}`,
      fileName: fileName
    };
  }

  async uploadVideo(fileName: string, tempFilePath: string, mediaCategory: string): Promise<MediaUploadRes> {
    let existsFileName;

    try {
      existsFileName = await minioClient.getObject(this.bucketName, mediaCategory + '/' + fileName);
    } catch (error: any) {
      if (error.code === 'NoSuchKey') {
        console.log('error', error);
      } else {
        throw error;
      }
    }

    if (existsFileName) {
      throw new BaseError('FILE_EXISTS', 'File name already exists');
    }

    await minioClient.fPutObject(this.bucketName, mediaCategory + '/' + fileName, tempFilePath);

    // Xóa file tạm sau khi upload
    fs.unlink(tempFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error('Error deleting temp file:', unlinkErr);
      }
    });

    return {
      mediaUrl: `http://${this.minioEndpoint}/media/${this.bucketName}/${mediaCategory}/${fileName}`
    };
  }

  async getImageUrl(mediaCategory: string): Promise<GetMediaUrlRes> {
    const fileName = uuidv4();
    return {
      mediaUrl: `http://${this.minioEndpoint}/media/${this.bucketName}/${mediaCategory}/${fileName}`,
      fileName: fileName
    };
  }
}
