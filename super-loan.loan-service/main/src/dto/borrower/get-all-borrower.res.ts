import { DebtStatus } from '@/enums/debt-status.enum';
import { Expose, Type } from 'class-transformer';

class BorrowerProfile {
  @Expose()
  income!: number;
  @Expose()
  debtStatus!: DebtStatus;
}

export class GetAllBorrowerRes {
  @Expose()
  borrowerId!: string;
  @Expose()
  email!: string;
  @Expose()
  phoneNumber!: string;
  @Expose()
  numberOfContracts!: number;

  @Expose()
  @Type(() => BorrowerProfile)
  borrowerProfile!: BorrowerProfile;

  @Expose()
  createAt!: Date;
}
