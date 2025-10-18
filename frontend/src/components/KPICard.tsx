type KPICardProps = { title: string; value: string; barColor?: string };
export default function KPICard({ title, value, barColor = "bg-[#3b82f6]" }: KPICardProps) {
  return (
    <div className="rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 p-4">
      <div className={`h-1.5 rounded-full mb-3 ${barColor}`} />
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-3xl font-semibold">{value}</div>
    </div>
  );
}
