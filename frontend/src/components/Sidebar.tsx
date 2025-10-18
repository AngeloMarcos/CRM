"use client";
import { Calendar, Users, MessageSquare, Receipt, BarChart3, Settings, Home } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Início", icon: Home },
  { href: "/agenda", label: "Agenda", icon: Calendar },
  { href: "/pacientes", label: "Pacientes", icon: Users },
  { href: "/leads", label: "Leads (WA)", icon: MessageSquare },
  { href: "/orcamentos", label: "Orçamentos", icon: Receipt },
  { href: "/mensagens", label: "Mensagens", icon: MessageSquare },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
  { href: "/config", label: "Configurações", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-screen sticky top-0 w-[4.25rem] md:w-60 p-2 md:p-4">
      <div className="h-full rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 backdrop-blur">
        <div className="px-2 md:px-4 py-4 md:py-5 text-sm md:text-lg font-semibold">Mentoark.ai</div>
        <nav className="px-1 md:px-2 space-y-1">
          {items.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-3 px-2 md:px-3 py-2 rounded-xl",
                  active ? "bg-[#0b1324]/70 text-white ring-1 ring-slate-800" : "hover:bg-slate-800/50 text-slate-300"
                )}
                title={label}
              >
                <Icon size={18} />
                <span className="hidden md:inline">{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
