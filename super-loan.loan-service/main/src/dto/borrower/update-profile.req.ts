import { IdentifyCardIssuedPlace } from '@/models/borrower_profile.model';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsDateString,
  MaxLength,
  Matches,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber
} from 'class-validator';

export class UpdateProfileReq {
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Fullname must not exceed 50 characters' })
  @Matches(/^[a-zA-ZÀ-ỹ\s]*$/, { message: 'Fullname must not contain special characters' })
  fullname?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true, message: 'Each email must be a valid email address' })
  emails?: string[];

  @IsOptional()
  @IsArray()
  @Matches(/^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7,8}$/, {
    each: true,
    message: 'Each phone number must be a valid Vietnamese number'
  })
  phoneNumbers?: string[];

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsNumber()
  income?: number;

  @IsOptional()
  @IsString()
  identifyCardNumber?: string;

  @IsOptional()
  @IsDateString()
  identifyCardIssuedDate?: string;

  @IsOptional()
  @IsEnum(IdentifyCardIssuedPlace, {
    message: 'Identify card issued place must be either RESIDENCE_REGISTRY or ADMINISTRATIVE_POLICE'
  })
  identifyCardIssuedPlace?: IdentifyCardIssuedPlace;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  borrowerIncomeProofDocuments?: string[];

  @IsOptional()
  @IsString()
  homeAddress?: string;

  @IsOptional()
  @IsString()
  workAddress?: string;

  @IsOptional()
  @IsDateString()
  birthday?: string;

  @IsOptional()
  @IsString()
  @Matches(/^(MALE|FEMALE)$/, { message: 'Gender must be either MALE or FEMALE' })
  gender?: 'MALE' | 'FEMALE';

  @IsOptional()
  @IsString()
  socialLink?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BankAccount)
  bankAccounts?: BankAccount[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  signAttachments?: string[];
}

export class BankAccount {
  @IsString()
  accountNumber!: string;

  @IsString()
  bankName!: string;

  @IsOptional()
  isDefault!: boolean;
}
