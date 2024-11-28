import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class SeenNotificationReq {
  @IsNotEmpty()
  @IsBoolean()
  seenAll!: boolean;
  @IsOptional()
  notificationIds?: string[];
}
