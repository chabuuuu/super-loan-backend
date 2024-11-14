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
  IsNumber,
  IsNotEmpty,
  IsObject
} from 'class-validator';

class Email {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @IsEmail({}, { each: true, message: 'Each email must be a valid email address' })
  content: string;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

class PhoneNumber {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title?: string;

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  @Matches(/^0(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7,8}$/, {
    each: true,
    message: 'Each phone number must be a valid Vietnamese number'
  })
  content: string;

  constructor(content: string, title?: string) {
    this.content = content;
    this.title = title || '';
  }
}

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
  @IsObject({ each: true })
  emails?: Email[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  phoneNumbers?: PhoneNumber[];

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
  bankId!: string;

  @IsString()
  accountNumber!: string;

  @IsString()
  bankName!: string;

  @IsOptional()
  isDefault!: boolean;
}
