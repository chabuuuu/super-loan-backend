import { ErrorCode } from '@/enums/error-code.enums';
import { RedisSchemaEnum } from '@/enums/redis-schema.enum';
import BaseError from '@/utils/error/base.error';
import redis from '@/utils/redis/redis.util';
import jwt from 'jsonwebtoken';

export async function authenticateJWT(req: any, res: any, next: any) {
  try {
    let token: string = req.header('Authorization');
    if (!token) {
      throw new BaseError(ErrorCode.AUTH_01, 'Authorization header is required');
    }
    if (token != null) {
      token = token.split('Bearer ')[1];
    }
    const secretKey = process.env.SECRET_KEY || '';
    console.log(secretKey);

    jwt.verify(token, secretKey, async (err: any, user: any) => {
      if (err) {
        return next(new BaseError(ErrorCode.AUTH_02, 'Invalid token. You need to login first'));
      }

      //Tiếp tục check xem nếu token này được cấp trước lúc logout => không cho phép truy cập
      const logoutTokenTime = await redis.get(`${RedisSchemaEnum.logoutTokenTime}:${user.id}`);
      console.log('decoded', user, 'logoutTokenTime', Number(logoutTokenTime), 'iat', Number(user.iat));

      if (logoutTokenTime) {
        if (Number(logoutTokenTime) >= Number(user.iat)) {
          return next(new BaseError(ErrorCode.AUTH_02, 'Invalid token. You need to login first'));
        }
      }

      console.log('Logged in as:', user);
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
}
