import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  private normalize(msisdn: string) { return msisdn.replace(/\D/g, ''); }

  async upsertContact(orgId: string, from: string) {
    const wh = this.normalize(from);
    const existing = await this.prisma.contact.findFirst({ where: { orgId, whatsapp: wh }});
    if (existing) return existing;
    return this.prisma.contact.create({ data: { orgId, whatsapp: wh, tags: [] }});
  }

  async upsertConversation(orgId: string, contactId: string) {
    const c = await this.prisma.conversation.findFirst({
      where: { orgId, contactId, status: 'open' }
    });
    if (c) return c;
    return this.prisma.conversation.create({
      data: { orgId, contactId, status: 'open', channel: 'whatsapp' }
    });
  }

  async handleIncoming({ orgId, from, text, raw }: any) {
    const contact = await this.upsertContact(orgId, from);
    const convo = await this.upsertConversation(orgId, contact.id);
    await this.prisma.message.create({
      data: { orgId, conversationId: convo.id, direction: 'in', body: text ?? '', raw }
    });
    await this.prisma.conversation.update({
      where: { id: convo.id },
      data: { lastMessageAt: new Date() }
    });
    await this.prisma.contact.update({
      where: { id: contact.id },
      data: { lastInteractionAt: new Date() }
    });
  }
}
