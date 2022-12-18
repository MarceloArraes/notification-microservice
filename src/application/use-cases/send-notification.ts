import { Content } from '../entities/notification-content';
import { Notification } from '../entities/notifications';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;

    const notification = new Notification({
      content: new Content(content),
      recipientId,
      category,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
