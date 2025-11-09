// backend/scripts/smoke.ts
const base = process.env.API ?? "http://localhost:4000";

async function hit(path: string, init?: RequestInit) {
  const res = await fetch(base + path, init);
  const txt = await res.text();
  try { return JSON.parse(txt); } catch { return txt; }
}

(async () => {
  console.log("🔍 Health:", await hit("/api/health"));

  console.log("➕ Criando lead de teste...");
  const created = await hit("/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Smoke Lead", phone: "11900000000" }),
  });
  console.log(created);

  console.log("📋 Listando leads...");
  const list = await hit("/api/leads");
  console.log(`→ ${list?.data?.length ?? 0} leads encontrados.`);
})();
