import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification) return null;
    return PrismaNotificationMapper.toDomain(notification);
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notification = await this.prismaService.notification.findMany({
      where: {
        recipientId: recipientId,
      },
    });
    if (!notification) return null;
    const mappedNotificationArray = notification.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
    return mappedNotificationArray;
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId: recipientId,
      },
    });
    return count;
  }

  async save(notification: Notification): Promise<void> {
    const raw = await PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
