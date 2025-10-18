"use client";
import { X } from "lucide-react";

type Props = { open: boolean; title?: string; onClose: () => void; children: React.ReactNode; };

export default function Modal({ open, title, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 w-full max-w-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">{title}</h3>
          <button className="px-2 py-1 ring-1 ring-slate-700 rounded-lg hover:ring-slate-500" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  );
}
