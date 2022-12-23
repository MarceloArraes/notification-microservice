import { Content } from '../../src/application/entities/notification-content';
import {
  Notification,
  NotificationProps,
} from '../../src/application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social fin2',
    content: new Content('something something'),
    recipientId: 'recipient-id-2',
    ...override,
  });
}
