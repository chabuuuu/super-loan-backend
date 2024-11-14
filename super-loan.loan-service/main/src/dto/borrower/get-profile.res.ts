import { Expose } from 'class-transformer';

export class GetProfileRes {
  @Expose()
  borrowerId!: string;

  @Expose()
  fullname!: string;

  @Expose()
  avatar?: string;

  @Expose()
  emails!: { title: string; content: string }[];

  @Expose()
  phoneNumbers!: { title: string; content: string }[];

  @Expose()
  jobTitle?: string;

  @Expose()
  income?: number;

  @Expose()
  identifyCardNumber?: string;

  @Expose()
  identifyCardIssuedDate?: Date;

  @Expose()
  identifyCardIssuedPlace?: string;

  @Expose()
  borrowerIncomeProofDocuments!: string[];

  @Expose()
  homeAddress!: string;

  @Expose()
  workAddress!: string;

  @Expose()
  birthday!: Date;

  @Expose()
  gender!: 'MALE' | 'FEMALE';

  @Expose()
  socialLink!: string;

  @Expose()
  bankAccounts!: { accountNumber: string; bankName: string; isDefault: boolean }[];

  @Expose()
  signAttachments!: string[];
}
