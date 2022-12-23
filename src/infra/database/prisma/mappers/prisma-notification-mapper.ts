import { Notification } from 'src/application/entities/notification';
import { Notification as RawNotification } from '@prisma/client';
import { Content } from 'src/application/entities/notification-content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      category: notification.category,
      content: notification.content.value,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        recipientId: raw.recipientId,
        category: raw.category,
        content: new Content(raw.content),
        readAt: raw.readAt,
        canceledAt: raw.cancelAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
