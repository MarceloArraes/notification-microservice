import { Content } from './notification-content';
import { Notification } from './notification';

describe('Notification', () => {
  it('Should be able to create a Notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade os something'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });
    expect(notification).toBeTruthy();
  });
});
