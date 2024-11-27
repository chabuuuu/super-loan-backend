import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  IsNumber,
  IsPositive,
  IsEnum,
  Min,
  Max,
  ValidateIf
} from 'class-validator';

export enum LoanType {
  UNSECURED_LOAN = 'UNSECURED_LOAN',
  MORTGAGE_LOAN = 'MORTGAGE_LOAN'
}

export class CreateLoanPackageReq {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, { message: 'Loan package name must not exceed 100 characters' })
  @Matches(/^[a-zA-ZÀ-ỹ0-9\s]*$/, {
    message: 'Loan package name must not contain special characters'
  })
  loanPackageName!: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Limit amount must be an integer' })
  @IsPositive({ message: 'Limit amount must be a positive number' })
  limitAmount!: number; // in VND

  @IsNotEmpty()
  @IsEnum(LoanType, { message: 'Loan type must be either UNSECURED_LOAN or MORTGAGE_LOAN' })
  loanType!: LoanType;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  preference!: string;

  @IsNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'Interest rate must be a valid number' })
  @Min(0, { message: 'Interest rate must be at least 0%' })
  @Max(100, { message: 'Interest rate must not exceed 100%' })
  interestRate!: number; // as percentage

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Loan term must be an integer' })
  @Min(1, { message: 'Loan term must be at least 1 month' })
  @Max(12, { message: 'Loan term must not exceed 12 months' })
  loanTermLimit!: number;

  @IsNotEmpty()
  @ValidateIf((_, value) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '(([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]{2,})|' + // domain
        'localhost|' + // localhost
        '\\d{1,3}(\\.\\d{1,3}){3})' + // or ipv4
        '(\\:\\d+)?' + // port
        '(\\/[-a-zA-Z0-9%_.~+]*)*' + // path
        '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // query string
        '(\\#[-a-zA-Z0-9_]*)?$'
    );
    return !urlPattern.test(value); // If not a URL, validate as text
  })
  @IsString()
  terms!: string;
}
