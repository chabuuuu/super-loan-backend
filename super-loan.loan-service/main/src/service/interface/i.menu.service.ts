import { JwtClaimDto } from '@/dto/jwt-claim.dto';
import { MenuDto } from '@/dto/menu/menu.dto';

export interface IMenuService {
  getMyMenu(user: JwtClaimDto): Promise<MenuDto[]>;
}
