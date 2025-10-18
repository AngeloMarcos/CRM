import { Plus } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-[#0b1324]/80 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-slate-900/60 rounded-2xl px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3">
      <input
        placeholder="Buscar paciente, telefone ou protocolo..."
        className="flex-1 bg-slate-900/60 ring-1 ring-slate-800 rounded-xl px-4 py-2 outline-none focus:ring-slate-600 text-slate-200"
      />
      <Link href="/pacientes" className="px-4 py-2 rounded-xl bg-[#ff6600] text-white font-medium hover:opacity-90">
        Novo Paciente
      </Link>
      <button className="px-4 py-2 rounded-xl bg-[#3b82f6] text-white font-medium hover:opacity-90 flex items-center gap-2">
        <Plus size={18} /> <span className="hidden sm:inline">Nova Consulta</span>
      </button>
    </header>
  );
}
