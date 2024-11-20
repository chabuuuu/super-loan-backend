import { mediaController } from '@/container/media.container';
import uploadImageMiddleware from '@/middleware/upload-image.middleware';
import uploadVideoMiddleware from '@/middleware/upload-video.middleware';
import express from 'express';
const mediaRouter = express.Router();

mediaRouter
  .post('/upload-video', uploadVideoMiddleware.single('file'), mediaController.uploadVideo.bind(mediaController))

  .post('/upload-media', uploadImageMiddleware.single('file'), mediaController.uploadMedia.bind(mediaController))

  .get('/video-url', mediaController.getVideoUrl.bind(mediaController))

  .get('/media-url', mediaController.getImageUrl.bind(mediaController))

  .get('', mediaController.get.bind(mediaController));

export default mediaRouter;
