import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { makeNotification } from '../../../test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('get notifications by recipientId', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );
    const notification = makeNotification({
      recipientId: 'example-recipient-id',
    });
    const notification2 = makeNotification({
      recipientId: 'example-recipient-id',
    });

    await notificationsRepository.create(notification);
    await notificationsRepository.create(notification2);

    const { notificationArray } = await getRecipientNotifications.execute({
      recipientId: notification.recipientId,
    });

    expect(notificationArray.length).toEqual(2);
    expect(notificationArray).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ]),
    );
  });
});
