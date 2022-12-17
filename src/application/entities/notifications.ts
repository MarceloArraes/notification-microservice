import { Content } from './notification-content';

export interface NotificationProps {
  id: string;
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private props: NotificationProps;

  constructor(props) {
    this.props = props;
  }

  public set content(content: Content) {
    /*     if (content.length < 5) {
      throw new Error();
    } */
    this.props.content = content;
  }
  public get content(): Content {
    return this.props.content;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
