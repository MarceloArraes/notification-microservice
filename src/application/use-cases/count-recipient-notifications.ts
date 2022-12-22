import { Content } from '../entities/notification-content';
import { Notification } from '../entities/notification';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

/* interface CountRecipientNotificationsResponse {
  notification: Notification;
} */
interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
