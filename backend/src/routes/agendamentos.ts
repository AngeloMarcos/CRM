import { FastifyInstance } from 'fastify';
import { prisma } from '../db/prisma';
import { z } from 'zod';

const AgendamentoSchema = z.object({
  pacienteId: z.string().uuid(),
  inicio: z.coerce.date(),
  fim: z.coerce.date(),
  procedimento: z.string().optional(),
  status: z.enum(['CONFIRMADO', 'PENDENTE', 'CANCELADO']).default('PENDENTE')
});

export default async function agendamentosRoutes(app: FastifyInstance) {
  app.get('/', async () =>
    prisma.agendamento.findMany({ include: { paciente: true }, orderBy: { inicio: 'asc' } })
  );

  app.post('/', async (req, res) => {
    const parsed = AgendamentoSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send(parsed.error.flatten());
    const novo = await prisma.agendamento.create({ data: parsed.data });
    return res.status(201).send(novo);
  });
}
