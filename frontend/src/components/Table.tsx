type TableProps = {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  rightSlot?: React.ReactNode;
};

export default function Table({ title, headers, rows, rightSlot }: TableProps) {
  return (
    <div className="rounded-2xl bg-[#111827]/80 ring-1 ring-slate-800 p-4">
      <div className="mb-3 font-semibold flex items-center justify-between gap-2">
        <span>{title}</span>
        {rightSlot}
      </div>
      <div className="overflow-hidden rounded-xl ring-1 ring-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/70 text-slate-300">
            <tr>
              {headers.map((h) => (
                <th key={h} className="text-left px-4 py-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="odd:bg-slate-900/40 even:bg-slate-900/20">
                {r.map((c, j) => (
                  <td key={j} className="px-4 py-2">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
