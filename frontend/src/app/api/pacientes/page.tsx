"use client";
import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import PacienteForm from "../../../components/PacienteForm";
import { usePacientes } from "../../../store/pacientes";

export default function PacientesPage() {
  const { pacientes, loading, error, fetchAll, add, openCreate, setOpenCreate } = usePacientes();

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const headers = ["Nome", "Telefone", "Documento"];
  const rows = pacientes.map(p => [p.nome, p.telefone, p.documento || "-"]);

  return (
    <div className="min-h-screen flex gap-4 p-4">
      <Sidebar />
      <main className="flex-1 space-y-4">
        <Header />
        <div className="rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Pacientes</h2>
            <button className="px-4 py-2 rounded-xl bg-[#ff6600] text-white" onClick={() => setOpenCreate(true)}>
              Novo Paciente
            </button>
          </div>
          <div className="mt-4">
            {loading && <div className="text-slate-300">Carregando...</div>}
            {error && <div className="text-red-400">{error}</div>}
            {!loading && !error && <Table title="Lista" headers={headers} rows={rows} />}
          </div>
        </div>

        <Modal open={openCreate} title="Cadastrar Paciente" onClose={() => setOpenCreate(false)}>
          <PacienteForm
            onSubmit={async (v) => {
              await add(v);
              setOpenCreate(false);
            }}
          />
        </Modal>

        <footer className="text-sm text-slate-400 py-6">
          MentoArk • CRM Base — {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}
