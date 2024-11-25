import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { IMediaService } from '@/service/interface/i.media.service';
import { ITYPES } from '@/types/interface.types';
import BaseError from '@/utils/error/base.error';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import fs from 'fs';
import { spawn } from 'child_process';
import mime from 'mime';
import { GetMediaDto } from '@/dto/get-media.dto';

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
      const width = req.query.width ? parseInt(req.query.width as string, 10) : undefined;
      const height = req.query.height ? parseInt(req.query.height as string, 10) : undefined;

      if (!fileName) {
        return res.status(400).send('No file name provided.');
      }

      if ((width && width <= 0) || (height && height <= 0)) {
        return res.status(400).send('Width and height must be positive numbers.');
      }

      const mediaDto: GetMediaDto = await this.mediaService.get(fileName, mediaCategory);

      const contentType = mime.lookup(fileName) || mediaDto.metadata.contentType || 'image/jpeg';

      const MIN_WIDTH = 100;
      const MIN_HEIGHT = 100;

      if (width || height) {
        const resizeArgs = this.getResizeArgs(width, height, MIN_WIDTH, MIN_HEIGHT);
        const ffmpeg = spawn('ffmpeg', ['-i', 'pipe:0', ...resizeArgs, '-f', 'image2', 'pipe:1']);

        ffmpeg.stderr.on('data', (data) => {
          console.error(`FFmpeg error: ${data}`);
        });

        ffmpeg.on('close', (code) => {
          if (code !== 0) {
            console.error(`FFmpeg exited with code ${code}`);
            return next(new Error('Error processing image resize.'));
          }
        });
        res.setHeader('Content-Type', contentType);
        mediaDto.mediaStream.pipe(ffmpeg.stdin);
        ffmpeg.stdout.pipe(res);
        return;
      }

      res.setHeader('Content-Type', contentType);
      mediaDto.mediaStream.pipe(res);
    } catch (error) {
      next(error);
    }
  }

  private getResizeArgs(width?: number, height?: number, minWidth: number = 100, minHeight: number = 100): string[] {
    const args: string[] = [];

    if (width && !height) {
      // Maintain aspect ratio, ensure width >= minWidth
      args.push('-vf', `scale=${Math.max(width, minWidth)}:-2`);
    } else if (!width && height) {
      // Maintain aspect ratio, ensure height >= minHeight
      args.push('-vf', `scale=-2:${Math.max(height, minHeight)}`);
    } else if (width && height) {
      // Ensure both dimensions are above minimum
      const finalWidth = Math.max(width, minWidth);
      const finalHeight = Math.max(height, minHeight);
      args.push('-vf', `scale=${finalWidth}:${finalHeight}`);
    }

    return args;
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
        return res.send_badRequest('No media category provided.');
      }

      const result = await this.mediaService.getImageUrl(mediaCategory);

      res.send_ok('Get resized image URL successfully', result);
    } catch (error) {
      next(new BaseError('UNKNOWN', 'Get image URL failed'));
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
