import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IMediaService } from '@/service/interface/i.media.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import fs from 'fs';
import mime from 'mime';

@injectable()
export class MediaController {
  private mediaService: IMediaService;
  constructor(@inject('MediaService') mediaService: IMediaService) {
    this.mediaService = mediaService;
  }
  /**
   * * GET /api/media/?bucketName=superloan&mediaCategory=category&fileName=fileName
   */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const mediaCategory = req.query.mediaCategory?.toString();
      const fileName = req.query.fileName?.toString();

      if (!fileName) {
        return res.send_badRequest('No file name provided.');
      }

      const mediaDto = await this.mediaService.get(fileName, mediaCategory);

      // Xác định Content-Type từ metadata
      let contentType = 'image/jpeg';

      if (fileName.includes('.')) {
        contentType = mime.lookup(fileName);
      } else {
        contentType = mediaDto.metadata.contentType || 'image/jpeg';
      }

      console.log('contentType', contentType);

      res.setHeader('Content-Type', contentType);

      mediaDto.mediaStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /api/media/media-url
   * @param req
   * @param res
   * @param next
   * @returns
   */
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

  /**
   * * POST /api/media/upload-media
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async uploadMedia(req: Request, res: Response, next: NextFunction) {
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

      console.log('tempFilePath', req.file);

      const fileExtension = req!.file!.originalname!.split('.').pop()!.toLowerCase();

      const fileName = req.query.fileName.toString() + '.' + fileExtension;

      const result = await this.mediaService.uploadImage(fileName, tempFilePath, mediaCategory);
      res.send_ok('Upload image successfully', result);
    } catch (error) {
      console.log('error', error);

      res.send_internalServerError('Upload image failed', error);
    }
  }

  /**
   * * POST /api/media/upload-video
   * @param req
   * @param res
   * @param next
   * @returns
   */
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

  /**
   * * GET /api/media/video-url
   * @param req
   * @param res
   * @param next
   * @returns
   */
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
