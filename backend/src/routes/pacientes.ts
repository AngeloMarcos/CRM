import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../db/prisma';

const PacienteSchema = z.object({
  nome: z.string().min(2),
  telefone: z.string().min(8),
  documento: z.string().optional(),
  observacoes: z.string().optional()
});

export default async function pacientesRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const all = await prisma.paciente.findMany({ orderBy: { createdAt: 'desc' } });
    return all;
  });

  app.post('/', async (req, res) => {
    const parsed = PacienteSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).send(parsed.error.flatten());
    const novo = await prisma.paciente.create({ data: parsed.data });
    return res.status(201).send(novo);
  });

  app.get('/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    const p = await prisma.paciente.findUnique({ where: { id } });
    if (!p) return res.status(404).send({ error: 'Not found' });
    return p;
  });

  app.delete('/:id', async (req, res) => {
    const { id } = req.params as { id: string };
    await prisma.paciente.delete({ where: { id } });
    return res.status(204).send();
  });
}
