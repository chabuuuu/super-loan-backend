import { IBaseCrudController } from '@/controller/interfaces/i.base-curd.controller';
import { Vault } from '@/models/vault.model';
import { IVaultService } from '@/service/interface/i.vault.service';
import { ITYPES } from '@/types/interface.types';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class VaultController {
  public common: IBaseCrudController<Vault>;
  private vaultService: IVaultService<Vault>;
  constructor(
    @inject('VaultService') vaultService: IVaultService<Vault>,
    @inject(ITYPES.Controller) common: IBaseCrudController<Vault>
  ) {
    this.vaultService = vaultService;
    this.common = common;
  }
}
