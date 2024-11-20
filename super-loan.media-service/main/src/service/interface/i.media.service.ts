import { GetMediaUrlRes } from '@/dto/get-image-url.res';
import { MediaUploadRes } from '@/dto/media-upload.res';

export interface IMediaService {
  getVideoUrl(mediaCategory: string): Promise<GetMediaUrlRes>;
  uploadVideo(fileName: string, tempFilePath: string, mediaCategory: string): Promise<MediaUploadRes>;
  uploadImage(fileName: string, tempFilePath: string, mediaCategory: string): Promise<MediaUploadRes>;
  getImageUrl(mediaCategory: string, width?: number, height?: number): Promise<GetMediaUrlRes>;
}
