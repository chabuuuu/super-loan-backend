import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export class UnSeenNotificationReq {
  @IsNotEmpty()
  @IsBoolean()
  unSeenAll!: boolean;
  @IsOptional()
  notificationIds?: string[];
}
