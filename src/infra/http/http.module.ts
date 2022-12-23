import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from 'src/application/use-cases/cancel-notification';
import { GetRecipientNotifications } from 'src/application/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/application/use-cases/read-notification';
import { UnreadNotification } from 'src/application/use-cases/unread-notification';
import { CountRecipientNotifications } from 'src/application/use-cases/count-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
  ],
})
export class HttpModule {}
