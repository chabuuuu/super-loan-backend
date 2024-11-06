import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import redis from '@/utils/redis/redis.util';
import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import * as fs from 'fs';
import * as path from 'path';

@injectable()
export class StaticDataController {
  /**
   * * GET /static-data/bank
   * @param req
   * @param res
   * @param next
   */
  async getAllBankData(req: Request, res: Response, next: NextFunction) {
    try {
      let result = await redis.get(RedisSchemaEnum.banksData);

      const projectRoot = process.cwd();

      if (!result) {
        const filePath = path.join(projectRoot, 'resources', 'banks.data.json');

        const data = fs.readFileSync(filePath, 'utf8');

        redis.set(RedisSchemaEnum.banksData, data);

        result = data;
      }

      res.send_ok('Get all bank data successfully', JSON.parse(result));
    } catch (error) {
      next(error);
    }
  }

  /**
   * * GET /static-data/tinh-thanh-vietnam
   * @param req
   * @param res
   * @param next
   */
  async getAllTinhThanhVietnamData(req: Request, res: Response, next: NextFunction) {
    try {
      let result = await redis.get(RedisSchemaEnum.tinhThanhVietnamData);

      const projectRoot = process.cwd();

      if (!result) {
        const filePath = path.join(projectRoot, 'resources', 'tinh-tp-vietnam.data.json');

        const data = fs.readFileSync(filePath, 'utf8');

        redis.set(RedisSchemaEnum.tinhThanhVietnamData, data);

        result = data;
      }

      res.send_ok('Get all tinh thanh vietnam data successfully', JSON.parse(result));
    } catch (error) {
      next(error);
    }
  }
}
