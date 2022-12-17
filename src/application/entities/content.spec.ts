import { Content } from './notification-content';

test('is should be able to create notification content', () => {
  const content = new Content('Vc recebeu uma msg');

  expect(content).toBeTruthy();
});
