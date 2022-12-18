import { Notification } from 'src/application/entities/notifications';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    console.log('notification', notification);
    this.notifications.push(notification);
  }
}
