import { isNumber } from 'class-validator';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification-content';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count the recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
    const notification = new Notification({
      category: 'social fin1',
      content: new Content('something something'),
      recipientId: 'example-recipient-id',
    });
    const notification2 = new Notification({
      category: 'social fin2',
      content: new Content('something something'),
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification2);

    const countedNotifications = await countRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(countedNotifications.count).toEqual(2);
    expect(isNumber(countedNotifications.count)).toBeTruthy();
  });
  it('should be able to count notifications just for one recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );
    const notification = new Notification({
      category: 'social fin1',
      content: new Content('something something'),
      recipientId: 'recipient-id-1',
    });
    const notification2 = new Notification({
      category: 'social fin2',
      content: new Content('something something'),
      recipientId: 'recipient-id-2',
    });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification2);

    const countedNotifications = await countRecipientNotifications.execute({
      recipientId: notification2.recipientId,
    });

    expect(countedNotifications.count).toEqual(1);
    expect(isNumber(countedNotifications.count)).toBeTruthy();
  });
});
