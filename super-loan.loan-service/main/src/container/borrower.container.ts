import { BorrowerController } from '@/controller/borrower.controller';
import { BorrowerService } from '@/service/borrower.service';
import { Borrower } from '@/models/borrower.model';
import { BorrowerRepository } from '@/repository/borrower.repository';
import { IBorrowerService } from '@/service/interface/i.borrower.service';
import { IBorrowerRepository } from '@/repository/interface/i.borrower.repository';
import { BaseContainer } from '@/container/base.container';
import { IPermissionSpecificRepository } from '@/repository/interface/i.permission_specific.repository';
import { PermissionSpecificRepository } from '@/repository/permission_specific.repository';

class BorrowerContainer extends BaseContainer {
  constructor() {
    super(Borrower);
    this.container.bind<IBorrowerService<Borrower>>('BorrowerService').to(BorrowerService);
    this.container.bind<IBorrowerRepository<Borrower>>('BorrowerRepository').to(BorrowerRepository);
    this.container.bind<BorrowerController>(BorrowerController).toSelf();

    //Import
    this.container
      .bind<IPermissionSpecificRepository<any>>('PermissionSpecificRepository')
      .to(PermissionSpecificRepository);
  }

  export() {
    const borrowerController = this.container.get<BorrowerController>(BorrowerController);
    const borrowerService = this.container.get<IBorrowerService<any>>('BorrowerService');
    return { borrowerController, borrowerService };
  }
}

const borrowerContainer = new BorrowerContainer();
const { borrowerController, borrowerService } = borrowerContainer.export();
export { borrowerController, borrowerService };
