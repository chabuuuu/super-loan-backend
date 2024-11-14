import { BorrowerProfile } from '@/models/borrower_profile.model';
import { BorrowerProfileRepository } from '@/repository/borrower_profile.repository';
import { IBorrowerProfileRepository } from '@/repository/interface/i.borrower_profile.repository';
import { BaseContainer } from '@/container/base.container';

class BorrowerProfileContainer extends BaseContainer {
  constructor() {
    super(BorrowerProfile);
    this.container
      .bind<IBorrowerProfileRepository<BorrowerProfile>>('BorrowerProfileRepository')
      .to(BorrowerProfileRepository);
  }

  export() {
    const borrowerProfileRepository =
      this.container.get<IBorrowerProfileRepository<BorrowerProfile>>('BorrowerProfileRepository');
    return { borrowerProfileRepository };
  }
}

const borrowerProfileContainer = new BorrowerProfileContainer();
const { borrowerProfileRepository } = borrowerProfileContainer.export();
export { borrowerProfileRepository };
