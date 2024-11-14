import { IMediaRepository } from '@/repository/interface/i.media.repository';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class MediaRepository implements IMediaRepository {}
