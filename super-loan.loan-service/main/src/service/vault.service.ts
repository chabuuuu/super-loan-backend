import { Vault } from '@/models/vault.model';
import { IVaultRepository } from '@/repository/interface/i.vault.repository';
import { BaseCrudService } from '@/service/base/base.service';
import { IVaultService } from '@/service/interface/i.vault.service';
import { inject, injectable } from 'inversify';

@injectable()
export class VaultService extends BaseCrudService<Vault> implements IVaultService<Vault> {
  private vaultRepository: IVaultRepository<Vault>;

  constructor(@inject('VaultRepository') vaultRepository: IVaultRepository<Vault>) {
    super(vaultRepository);
    this.vaultRepository = vaultRepository;
  }
}
