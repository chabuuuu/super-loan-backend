import { JwtClaimDto } from '@/dto/jwt-claim.dto';

export interface IMenuService {
  getMyMenu(user: JwtClaimDto): Promise<string[]>;
}
