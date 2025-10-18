type Props = { label: string; onClick?: () => void };
export default function QuickAction({ label, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 px-6 py-6 hover:ring-slate-600 transition text-left"
    >
      <div className="text-lg font-medium">{label}</div>
    </button>
  );
}
