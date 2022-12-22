import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification-content';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  it('should be able to cancel notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);
    const notification = new Notification({
      category: 'social fin',
      content: new Content('something something'),
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
    expect(notification).toBeTruthy();
  });

  it('should not be possible to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(async () => {
      return await cancelNotification.execute({
        notificationId: 'fake_id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
