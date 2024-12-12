import { HomeAddressDto } from '@/dto/home-address.dto';
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
  IsNotEmpty
} from 'class-validator';

export class UpdateProfileReq {
  @IsOptional()
  @IsString()
  @MaxLength(15, { message: 'Fullname must not exceed 15 characters' })
  @Matches(/^[a-zA-ZÀ-ỹ\s]*$/, { message: 'Fullname must not contain special characters' })
  @Matches(/^\S.*\S$|^[\S]$/, { message: 'Fullname must not have leading or trailing spaces' })
  fullname!: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsEmail()
  personalEmail!: string;

  @IsOptional()
  @IsEmail()
  workEmail!: string;

  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsNumber()
  income?: number;

  @IsOptional()
  @IsString()
  @Matches(/^\d{12}$/, { message: 'Identify card number must be a valid 12-digit number' })
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
  homeAddress?: HomeAddressDto;

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
