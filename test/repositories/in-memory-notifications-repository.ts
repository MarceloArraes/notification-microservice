import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];
  async findById(notificationId: string): Promise<Notification> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    if (!notification) return null;
    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
  async create(notification: Notification) {
    console.log('notification', notification);
    this.notifications.push(notification);
  }
}
