import { Permissions } from '@/constants/permission.constants';
import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { MenuMapDto } from '@/dto/menu/menu-map.dto';
import { MenuDto } from '@/dto/menu/menu.dto';
import { IMenuService } from '@/service/interface/i.menu.service';
import { convertToDto } from '@/utils/dto-convert/convert-to-dto.util';
import { inject, injectable } from 'inversify';
import { get } from 'lodash';

@injectable()
export class MenuService implements IMenuService {
  // public menuMap: { [key: string]: string[] } = {
  //   QUAN_LY_GOI_VAY: [Permissions.QUAN_LY_GOI_VAY, Permissions.QUAN_LY_DANH_MUC],
  //   QUAN_LY_TINH_TP: [Permissions.QUAN_LY_TINH_TP, Permissions.QUAN_LY_DANH_MUC],
  //   QUAN_LY_TAI_SAN: [Permissions.QUAN_LY_TAI_SAN, Permissions.QUAN_LY_DANH_MUC],
  //   QUAN_LY_LOAI_TAI_SAN: [Permissions.QUAN_LY_LOAI_TAI_SAN, Permissions.QUAN_LY_DANH_MUC],
  //   QUAN_LY_KHACH_HANG_VAY: [Permissions.QUAN_LY_KHACH_HANG_VAY],
  //   QUAN_LY_KHACH_HANG_CHO_VAY: [Permissions.QUAN_LY_KHACH_HANG_CHO_VAY],
  //   QUAN_LY_TAI_KHOAN: [Permissions.QUAN_LY_TAI_KHOAN],
  //   QUAN_LY_NHAN_VIEN: [Permissions.QUAN_LY_TAI_KHOAN, Permissions.QUAY_LY_NHAN_VIEN],
  //   KHO_QUY: [Permissions.QUAN_LY_KHO_QUY],
  //   PHIEU_CHI: [Permissions.LAP_PHIEU_CHI, Permissions.XEM_PHIEU_CHI_DA_LAP, Permissions.QUAN_LY_PHIEU_CHI],
  //   PHIEU_THU: [Permissions.LAP_PHIEU_THU, Permissions.XEM_PHIEU_THU_DA_LAP, Permissions.QUAN_LY_PHIEU_THU],
  //   YEU_CAU_VAY: [Permissions.QUAN_LY_YEU_CAU_VAY],
  //   HOP_DONG: [Permissions.QUAN_LY_HOP_DONG, Permissions.XEM_YEU_CAU_VAY_DA_LAP],
  //   THANH_TOAN_NO: [Permissions.QUAN_LY_THANH_TOAN_NO, Permissions.KHACH_HANG_THANH_TOAN_NO],
  //   THAM_DINH: [Permissions.XEM_YEU_CAU_THAM_DINH, Permissions.LAP_THAM_DINH, Permissions.QUAN_LY_THAM_DINH],
  //   BAI_VIET: [Permissions.QUAN_LY_BAI_VIET]
  // };

  public MENU_MAP: MenuMapDto[] = [
    {
      name_vn: 'Quản lý gói vay',
      name_en: 'Loan package management',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_GOI_VAY, Permissions.QUAN_LY_DANH_MUC],
      children: null
    },
    {
      name_vn: 'Quản lý danh mục',
      name_en: 'Category management',
      isCollapsed: true,
      permissions: [
        Permissions.QUAN_LY_TINH_TP,
        Permissions.QUAN_LY_LOAI_TAI_SAN,
        Permissions.QUAN_LY_TAI_SAN,
        Permissions.QUAN_LY_GOI_VAY
      ],
      children: [
        {
          name_vn: 'Quản lý tỉnh thành phố',
          name_en: 'Province city management',
          isCollapsed: false,
          permissions: [Permissions.QUAN_LY_TINH_TP],
          children: null
        },
        {
          name_vn: 'Quản lý loại tài sản',
          name_en: 'Asset type management',
          isCollapsed: false,
          permissions: [Permissions.QUAN_LY_LOAI_TAI_SAN],
          children: null
        },
        {
          name_vn: 'Quản lý tài sản',
          name_en: 'Asset management',
          isCollapsed: false,
          permissions: [Permissions.QUAN_LY_TAI_SAN],
          children: null
        },
        {
          name_vn: 'Quản lý gói vay',
          name_en: 'Loan package management',
          isCollapsed: false,
          permissions: [Permissions.QUAN_LY_GOI_VAY],
          children: null
        }
      ]
    },
    {
      name_vn: 'Quản lý khách hàng vay',
      name_en: 'Borrower management',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_KHACH_HANG_VAY],
      children: null
    },
    {
      name_vn: 'Quản lý khách hàng cho vay',
      name_en: 'Lender management',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_KHACH_HANG_CHO_VAY],
      children: null
    },
    {
      name_vn: 'Quản lý tài khoản',
      name_en: 'Account management',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_TAI_KHOAN],
      children: null
    },
    {
      name_vn: 'Quản lý nhân viên',
      name_en: 'Employee management',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_TAI_KHOAN, Permissions.QUAY_LY_NHAN_VIEN],
      children: null
    },
    {
      name_vn: 'Kho quỹ',
      name_en: 'Fund warehouse',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_KHO_QUY],
      children: null
    },
    {
      name_vn: 'Phiếu chi',
      name_en: 'Payment voucher',
      isCollapsed: false,
      permissions: [Permissions.LAP_PHIEU_CHI, Permissions.XEM_PHIEU_CHI_DA_LAP, Permissions.QUAN_LY_PHIEU_CHI],
      children: null
    },
    {
      name_vn: 'Phiếu thu',
      name_en: 'Receipt voucher',
      isCollapsed: false,
      permissions: [Permissions.LAP_PHIEU_THU, Permissions.XEM_PHIEU_THU_DA_LAP, Permissions.QUAN_LY_PHIEU_THU],
      children: null
    },
    {
      name_vn: 'Yêu cầu vay',
      name_en: 'Loan request',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_YEU_CAU_VAY, Permissions.XEM_YEU_CAU_VAY_DA_LAP],
      children: null
    },
    {
      name_vn: 'Hợp đồng',
      name_en: 'Contract',
      isCollapsed: false,
      permissions: [Permissions.QUAN_LY_HOP_DONG],
      children: null
    }
  ];

  /**
   * * Check menu
   */
  async checkAndAddMenu(menu: MenuMapDto, permissionIds: string[]): Promise<MenuDto | null> {
    //Check if the menu have one of the permissions in the permissionIds?
    if (menu.permissions.some((permission) => permissionIds.includes(permission))) {
      let getMenu = new MenuDto();
      getMenu = { ...menu };
      getMenu.children = null;
      getMenu.isCollapsed = false;
      getMenu = convertToDto(MenuDto, getMenu);

      //Recursively check the children
      if (menu.children) {
        console.log('menu.children', menu.children);

        for (const child of menu.children) {
          const childMenu = await this.checkAndAddMenu(child, permissionIds);
          if (childMenu) {
            if (!getMenu.children) {
              getMenu.children = [];
            }
            getMenu.children.push(childMenu);
            getMenu.isCollapsed = true;
          }
        }
      }

      return getMenu;
    }

    return null;
  }

  /**
   * * Get the menu of the current user
   */
  async getMyMenu(user: JwtClaimDto): Promise<MenuDto[]> {
    const permissionIds = user.permissionIds;

    const result: MenuDto[] = [];

    for (const menu of this.MENU_MAP) {
      //Check if the menu have one of the permissions in the permissionIds?
      const getMenu = await this.checkAndAddMenu(menu, permissionIds);

      // console.log('getMenu', getMenu);

      if (getMenu) {
        result.push(getMenu);
      }
    }

    return result;
  }
}
