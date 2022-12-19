import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
// import { PrismaService } from '../../prisma.service';
// import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';

@Controller('notifications')
export class NotificationsController {
  // constructor(private readonly prisma: PrismaService) {}
  constructor(private sendNotification: SendNotification) {}

  /*   @Delete()
  async delete(@Body() body: any) {
    await this.prisma.notification.delete({
      where: {
        id: body.id,
      },
    });
  } */

  /*   @Get()
  getHello() {
    return this.prisma.notification.findMany();
  } */

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    console.log('Saving...', body);

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification };
  }
}
