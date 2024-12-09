import { ValidateError } from '@/constants/validate.constants';
import { ErrorCode } from '@/enums/error-code.enums';
import BaseError from '@/utils/error/base.error';
import { plainToInstance } from 'class-transformer';
import { validate, validateOrReject } from 'class-validator';

export const classValidate = (Dto: any) => async (req: any, res: any, next: any) => {
  try {
    const dtoInstance = plainToInstance(Dto, req.body);
    const validateErrors = await validate(dtoInstance, {
      validationError: { target: false, value: false },
      stopAtFirstError: true
    });

    if (validateErrors.length > 0) {
      const formatError = new Map<string, string>();

      validateErrors.forEach((error: any) => {
        console.log('ERROR CONSTANT', error.constraints);

        //If key of error.constraints is not a string:
        if (Object.prototype.hasOwnProperty.call(error.constraints, 'isNotEmpty')) {
          formatError.set(error.property, ValidateError.NOT_EMPTY);
        } else {
          formatError.set(error.property, ValidateError.INVALID);
        }
      });

      throw new BaseError(
        ErrorCode.VALIDATION_ERROR,
        'Your request body is not valid',
        Object.fromEntries(formatError)
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
