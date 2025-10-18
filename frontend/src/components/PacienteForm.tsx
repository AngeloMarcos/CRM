"use client";
import { z } from "zod";
import { PacienteSchema } from "../lib/types";
import { useState } from "react";

type Props = { onSubmit: (values: z.infer<typeof PacienteSchema>) => Promise<void> | void; };

export default function PacienteForm({ onSubmit }: Props) {
  const [values, setValues] = useState({ nome: "", telefone: "", documento: "", observacoes: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handle = async () => {
    setError(null);
    const parsed = PacienteSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message || "Dados inválidos");
      return;
    }
    setSaving(true);
    try {
      await onSubmit(parsed.data);
      setValues({ nome: "", telefone: "", documento: "", observacoes: "" });
    } catch (e: any) {
      setError(e?.message || "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm text-slate-300">Nome</label>
        <input className="w-full bg-slate-900/60 ring-1 ring-slate-800 rounded-xl px-4 py-2 text-slate-200 mt-1" value={values.nome} onChange={e=>setValues(v=>({...v, nome:e.target.value}))} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm text-slate-300">Telefone</label>
          <input className="w-full bg-slate-900/60 ring-1 ring-slate-800 rounded-xl px-4 py-2 text-slate-200 mt-1" value={values.telefone} onChange={e=>setValues(v=>({...v, telefone:e.target.value}))} placeholder="(11) 9xxxx-xxxx" />
        </div>
        <div>
          <label className="text-sm text-slate-300">Documento (opcional)</label>
          <input className="w-full bg-slate-900/60 ring-1 ring-slate-800 rounded-xl px-4 py-2 text-slate-200 mt-1" value={values.documento||""} onChange={e=>setValues(v=>({...v, documento:e.target.value}))} placeholder="CPF/CNPJ" />
        </div>
      </div>
      <div>
        <label className="text-sm text-slate-300">Observações</label>
        <textarea className="w-full h-24 bg-slate-900/60 ring-1 ring-slate-800 rounded-xl px-4 py-2 text-slate-200 mt-1" value={values.observacoes||""} onChange={e=>setValues(v=>({...v, observacoes:e.target.value}))}/>
      </div>

      {error && <div className="text-sm text-red-400">{error}</div>}

      <div className="flex items-center justify-end gap-2">
        <button className="px-4 py-2 rounded-xl ring-1 ring-slate-700 hover:ring-slate-500" type="button" onClick={()=>setValues({ nome:"", telefone:"", documento:"", observacoes:""})}>Limpar</button>
        <button className="px-4 py-2 rounded-xl bg-[#3b82f6] text-white" type="button" disabled={saving} onClick={handle}>
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </div>
  );
}
