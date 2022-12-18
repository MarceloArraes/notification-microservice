import { Content } from './notification-content';
describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Vc recebeu uma msg');

    expect(content).toBeTruthy();
  });

  it('should not be able to create content with less than 5 chars', () => {
    expect(() => new Content('aad')).toThrow();
  });

  it('should not be able to create content with more than 240 chars', () => {
    expect(() => new Content('a'.repeat(300))).toThrow();
  });
});
