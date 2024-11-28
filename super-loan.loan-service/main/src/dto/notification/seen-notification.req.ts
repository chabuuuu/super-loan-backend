import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SeenNotificationReq {
  @IsNotEmpty()
  @IsBoolean()
  seenAll!: boolean;
  @IsNotEmpty()
  notificationIds!: string[];
}
