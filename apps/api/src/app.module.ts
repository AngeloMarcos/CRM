import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
  imports: [PrismaModule, WebhooksModule, ConversationsModule],
})
export class AppModule {}
