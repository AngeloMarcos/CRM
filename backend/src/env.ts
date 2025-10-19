import 'dotenv/config';

export const PORT = Number(process.env.PORT || 4000);
export const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
export const DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://mentoark:mentoark@localhost:5432/mentoark?schema=public';
