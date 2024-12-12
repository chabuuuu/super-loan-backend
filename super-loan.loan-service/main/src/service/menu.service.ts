import { Permissions } from '@/constants/permission.constants';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { IMenuService } from '@/service/interface/i.menu.service';
import { inject, injectable } from 'inversify';

@injectable()
export class MenuService implements IMenuService {
  public menuMap: { [key: string]: string[] } = {
    QUAN_LY_GOI_VAY: [Permissions.QUAN_LY_GOI_VAY, Permissions.QUAN_LY_DANH_MUC],
    QUAN_LY_TINH_TP: [Permissions.QUAN_LY_TINH_TP, Permissions.QUAN_LY_DANH_MUC],
    QUAN_LY_TAI_SAN: [Permissions.QUAN_LY_TAI_SAN, Permissions.QUAN_LY_DANH_MUC],
    QUAN_LY_LOAI_TAI_SAN: [Permissions.QUAN_LY_LOAI_TAI_SAN, Permissions.QUAN_LY_DANH_MUC],
    QUAN_LY_KHACH_HANG_VAY: [Permissions.QUAN_LY_KHACH_HANG_VAY],
    QUAN_LY_KHACH_HANG_CHO_VAY: [Permissions.QUAN_LY_KHACH_HANG_CHO_VAY],
    QUAN_LY_TAI_KHOAN: [Permissions.QUAN_LY_TAI_KHOAN],
    QUAN_LY_NHAN_VIEN: [Permissions.QUAN_LY_TAI_KHOAN, Permissions.QUAY_LY_NHAN_VIEN],
    KHO_QUY: [Permissions.QUAN_LY_KHO_QUY],
    PHIEU_CHI: [Permissions.LAP_PHIEU_CHI, Permissions.XEM_PHIEU_CHI_DA_LAP, Permissions.QUAN_LY_PHIEU_CHI],
    PHIEU_THU: [Permissions.LAP_PHIEU_THU, Permissions.XEM_PHIEU_THU_DA_LAP, Permissions.QUAN_LY_PHIEU_THU],
    YEU_CAU_VAY: [Permissions.QUAN_LY_YEU_CAU_VAY],
    HOP_DONG: [Permissions.QUAN_LY_HOP_DONG, Permissions.XEM_YEU_CAU_VAY_DA_LAP],
    THANH_TOAN_NO: [Permissions.QUAN_LY_THANH_TOAN_NO, Permissions.KHACH_HANG_THANH_TOAN_NO],
    THAM_DINH: [Permissions.XEM_YEU_CAU_THAM_DINH, Permissions.LAP_THAM_DINH, Permissions.QUAN_LY_THAM_DINH],
    BAI_VIET: [Permissions.QUAN_LY_BAI_VIET]
  };

  /**
   * * Get the menu of the current user
   */
  async getMyMenu(user: JwtClaimDto): Promise<string[]> {
    const permissionIds = user.permissionIds;

    const result = [];

    for (const menu in this.menuMap) {
      //Check if the menu have one of the permissions in the permissionIds?
      if (this.menuMap[menu].some((permission) => permissionIds.includes(permission))) {
        result.push(menu);
      }
    }

    return result;
  }
}
