import { Controller, Post, Body } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';

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

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
