import { Controller, Post, Body, Headers } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { z } from 'zod';

const EvoSchema = z.object({
  orgId: z.string(),
  from: z.string(),
  text: z.string().optional().default(''),
  messageId: z.string(),
  raw: z.any().optional()
});

@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly svc: WebhooksService) {}

  @Post('evo')
  async evo(@Body() body: any, @Headers('x-signature') sig?: string) {
    const data = EvoSchema.parse(body);
    await this.svc.handleIncoming(data);
    return { ok: true };
  }
}
