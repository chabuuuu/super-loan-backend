import { Expose } from 'class-transformer';

export class GetAllBorrowerRes {
  @Expose()
  borrowerId!: string;
  @Expose()
  email!: string;
  @Expose()
  phoneNumber!: string;
  @Expose()
  status!: string;
  @Expose()
  numberOfContracts!: number;
  @Expose()
  createAt!: Date;
}
