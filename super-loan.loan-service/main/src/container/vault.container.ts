import { VaultController } from '@/controller/vault.controller';
import { VaultService } from '@/service/vault.service';
import { Vault } from '@/models/vault.model';
import { VaultRepository } from '@/repository/vault.repository';
import { IVaultService } from '@/service/interface/i.vault.service';
import { IVaultRepository } from '@/repository/interface/i.vault.repository';
import { BaseContainer } from '@/container/base.container';

class VaultContainer extends BaseContainer {
  constructor() {
    super(Vault);
    this.container.bind<IVaultService<Vault>>('VaultService').to(VaultService);
    this.container.bind<IVaultRepository<Vault>>('VaultRepository').to(VaultRepository);
    this.container.bind<VaultController>(VaultController).toSelf();
  }

  export() {
    const vaultController = this.container.get<VaultController>(VaultController);
    const vaultService = this.container.get<IVaultService<any>>('VaultService');
    return { vaultController, vaultService };
  }
}

const vaultContainer = new VaultContainer();
const { vaultController, vaultService } = vaultContainer.export();
export { vaultController, vaultService };
