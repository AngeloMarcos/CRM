import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import KPICard from "../components/KPICard";
import Table from "../components/Table";
import QuickAction from "../components/QuickAction";

import {
  kpis,
  proximasConsultasHeaders,
  proximasConsultasRows,
  leadsHeaders,
  leadsRows,
} from "../lib/mock";

export default function HomePage() {
  return (
    <div className="min-h-screen flex gap-4 p-4">
      <Sidebar />
      <main className="flex-1 space-y-4">
        <Header />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <KPICard key={k.title} {...k} />
          ))}
        </section>

        <section className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <Table
              title="Próximas consultas (Hoje)"
              headers={proximasConsultasHeaders}
              rows={proximasConsultasRows}
            />
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-4">
            <Table title="Leads do WhatsApp (24h)" headers={leadsHeaders} rows={leadsRows} />
            <div className="rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 p-4 space-y-3">
              <div className="mb-1 font-semibold">Ações rápidas</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <QuickAction label="Agendar retorno" />
                <QuickAction label="Enviar orçamento" />
                <QuickAction label="Mensagem pós-consulta" />
                <QuickAction label="Gerar link de pagamento" />
              </div>
            </div>
          </div>
        </section>

        <footer className="text-sm text-slate-400 py-6">
          MentoArk • CRM Base — {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
