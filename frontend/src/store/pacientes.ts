"use client";
import { create } from "zustand";
import { Paciente } from "../lib/types";

type State = { pacientes: Paciente[]; loading: boolean; error?: string; openCreate: boolean; };
type Actions = {
  fetchAll: () => Promise<void>;
  add: (p: Omit<Paciente, "id">) => Promise<void>;
  setOpenCreate: (v: boolean) => void;
};

export const usePacientes = create<State & Actions>((set, get) => ({
  pacientes: [],
  loading: false,
  openCreate: false,
  fetchAll: async () => {
    set({ loading: true, error: undefined });
    try {
      const res = await fetch("/api/pacientes");
      const data: Paciente[] = await res.json();
      set({ pacientes: data, loading: false });
    } catch (e: any) {
      set({ loading: false, error: e?.message || "Erro ao carregar pacientes" });
    }
  },
  add: async (p) => {
    try {
      const res = await fetch("/api/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const novo: Paciente = await res.json();
      set({ pacientes: [novo, ...get().pacientes] });
    } catch (e: any) {
      set({ error: e?.message || "Erro ao criar paciente" });
    }
  },
  setOpenCreate: (v) => set({ openCreate: v }),
}));
