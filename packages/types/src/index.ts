import { z } from "zod";

export const MessageInSchema = z.object({
  orgId: z.string(),
  from: z.string(),
  text: z.string().default(""),
  messageId: z.string(),
  raw: z.any().optional()
});
export type MessageIn = z.infer<typeof MessageInSchema>;
