import { MenuDto } from '@/dto/menu/menu.dto';

export class MenuMapDto {
  name_vn!: string;
  name_en!: string;
  isCollapsed!: boolean;
  children: MenuMapDto[] | null = null;
  permissions!: string[];
  icon: string | null = null;
}
