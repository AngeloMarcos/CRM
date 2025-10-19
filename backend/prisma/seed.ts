import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const ana = await prisma.paciente.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      nome: 'Ana Paula',
      telefone: '(11) 91234-5678',
      documento: '123.456.789-00'
    }
  });

  await prisma.lead.createMany({
    data: [
      { nome: 'Maria', telefone: '(11) 9xxxx-xxxx', interesse: 'Botox' },
      { nome: 'Pedro', telefone: '(21) 9xxxx-xxxx', interesse: 'Lentes' }
    ]
  });

  await prisma.agendamento.create({
    data: {
      pacienteId: ana.id,
      inicio: new Date(Date.now() + 60 * 60 * 1000),
      fim: new Date(Date.now() + 2 * 60 * 60 * 1000),
      procedimento: 'Avaliação estética',
      status: 'CONFIRMADO'
    }
  });
}

main().finally(() => prisma.$disconnect());
