import { Expose } from 'class-transformer';

export class MenuDto {
  @Expose()
  name_vn!: string;
  @Expose()
  name_en!: string;
  @Expose()
  isCollapsed!: boolean;
  @Expose()
  children: MenuDto[] | null = null;
}
