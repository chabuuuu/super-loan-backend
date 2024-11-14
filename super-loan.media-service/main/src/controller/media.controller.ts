import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IMediaService } from '@/service/interface/i.media.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class MediaController {
  private mediaService: IMediaService;
  constructor(@inject('MediaService') mediaService: IMediaService) {
    this.mediaService = mediaService;
  }

  async getImageUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const mediaCategory = req.query.mediaCategory?.toString();

      if (!mediaCategory) {
        return res.send_badRequest('No bucket name provided.');
      }
      const result = await this.mediaService.getImageUrl(mediaCategory);
      res.send_ok('Get image url successfully', result);
    } catch (error) {
      throw new BaseError('UNKNOW', 'Get video url failed');
    }
  }

  async uploadImage(req: Request, res: Response, next: NextFunction) {
    const mediaCategory = req.query.mediaCategory?.toString();

    if (!mediaCategory) {
      return res.send_badRequest('No bucket name provided.');
    }

    if (!req.file) {
      return res.send_badRequest('No file uploaded or file is too large.');
    }
    if (!req.query.fileName) {
      return res.send_badRequest('No file name provided.');
    }

    try {
      const tempFilePath = req.file.path;
      const fileName = req.query.fileName.toString();

      const result = await this.mediaService.uploadImage(fileName, tempFilePath, mediaCategory);
      res.send_ok('Upload image successfully', result);
    } catch (error) {
      console.log('error', error);

      res.send_internalServerError('Upload image failed', error);
    }
  }

  async uploadVideo(req: Request, res: Response, next: NextFunction) {
    const mediaCategory = req.query.mediaCategory?.toString();
    if (!mediaCategory) {
      return res.send_badRequest('No bucket name provided.');
    }

    if (!req.file) {
      return res.send_badRequest('No file uploaded or file is too large.');
    }
    if (!req.query.fileName) {
      return res.send_badRequest('No file name provided.');
    }

    try {
      const tempFilePath = req.file.path;
      const fileName = req.query.fileName.toString();

      const result = await this.mediaService.uploadVideo(fileName, tempFilePath, mediaCategory);
      res.send_ok('Upload video successfully', result);
    } catch (error) {
      throw new BaseError('UNKNOWN', 'Upload video failed');
    }
  }

  async getVideoUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const mediaCategory = req.query.mediaCategory?.toString();

      if (!mediaCategory) {
        return res.send_badRequest('No bucket name provided.');
      }

      const result = await this.mediaService.getVideoUrl(mediaCategory);
      res.send_ok('Get video url successfully', result);
    } catch (error) {
      throw new BaseError('UNKNOWN', 'Get video url failed');
    }
  }
}
