import { NextResponse } from "next/server";
import { Paciente, PacienteSchema } from "../../../lib/types";
import { randomUUID } from "crypto";

let DB: Paciente[] = [
  { id: randomUUID(), nome: "Ana Paula", telefone: "(11) 91234-5678", documento: "123.456.789-00" },
  { id: randomUUID(), nome: "João Souza", telefone: "(11) 93456-7890" },
  { id: randomUUID(), nome: "Laura Martins", telefone: "(11) 99888-7777" },
];

export async function GET() {
  await new Promise(r => setTimeout(r, 150));
  return NextResponse.json(DB);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = PacienteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const novo: Paciente = { ...parsed.data, id: randomUUID() };
  DB = [novo, ...DB];
  return NextResponse.json(novo, { status: 201 });
}
