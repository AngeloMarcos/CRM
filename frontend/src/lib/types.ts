import { z } from "zod";

export const PacienteSchema = z.object({
  id: z.string().uuid().optional(),
  nome: z.string().min(2, "Informe o nome"),
  telefone: z.string().min(8, "Informe o telefone"),
  documento: z.string().optional(),
  observacoes: z.string().optional(),
});
export type Paciente = z.infer<typeof PacienteSchema>;
