import { Readable } from 'stream';

export class GetMediaDto {
  metadata!: any;
  mediaStream!: Readable;
}
