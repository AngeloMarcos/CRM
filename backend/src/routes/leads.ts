// backend/src/routes/leads.ts
import { FastifyInstance } from 'fastify';
import { prisma } from '../db/prisma';

export default async function leadsRoutes(app: FastifyInstance) {
  // Listar
  app.get('/', async () => {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    return { ok: true, data: leads };
  });

  // Criar
  app.post('/', async (req, reply) => {
    const body = req.body as { name: string; phone: string; interest?: string; status?: string; notes?: string };
    if (!body?.name || !body?.phone) return reply.code(400).send({ ok: false, error: 'name e phone são obrigatórios' });

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        interest: body.interest,
        status: (body.status as any) || 'NEW',
        notes: body.notes,
      },
    });
    return { ok: true, data: lead };
  });

  // Atualizar
  app.put('/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const body = req.body as Partial<{ name: string; phone: string; interest: string; status: string; notes: string }>;
    const lead = await prisma.lead.update({ where: { id }, data: body });
    return { ok: true, data: lead };
  });

  // Deletar
  app.delete('/:id', async (req) => {
    const { id } = req.params as { id: string };
    await prisma.lead.delete({ where: { id } });
    return { ok: true };
  });
}
