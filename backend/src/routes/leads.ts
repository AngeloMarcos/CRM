import { FastifyInstance } from 'fastify';
import { prisma } from '../db/prisma';
import { z } from 'zod';

const LeadSchema = z.object({
  nome: z.string().optional(),
  telefone: z.string(),
  interesse: z.string().optional()
});

export default async function leadsRoutes(app: FastifyInstance) {
  app.get('/', async () => prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }));

  app.post('/', async (req, res) => {
    const parsed = LeadSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send(parsed.error.flatten());
    const novo = await prisma.lead.create({ data: parsed.data });
    return res.status(201).send(novo);
  });
}
