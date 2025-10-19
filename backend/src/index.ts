import Fastify from "fastify";
import cors from "@fastify/cors";
import { PORT, CORS_ORIGIN } from "./env";
import pacientesRoutes from "./routes/pacientes";
import leadsRoutes from "./routes/leads";
import agendamentosRoutes from "./routes/agendamentos";

async function bootstrap() {
  const app = Fastify({ logger: true });

  await app.register(cors, { origin: CORS_ORIGIN });

  // health
  app.get("/api/health", async () => ({
    ok: true,
    service: "mentoark-backend",
  }));

  // routes
  app.register(pacientesRoutes, { prefix: "/api/pacientes" });
  app.register(leadsRoutes, { prefix: "/api/leads" });
  app.register(agendamentosRoutes, { prefix: "/api/agendamentos" });

  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`✅ Backend on http://localhost:${PORT}`);
  } catch (err: unknown) {
    app.log.error({ err }, "❌ Failed to start server");
    process.exit(1);
  }
}

bootstrap();
