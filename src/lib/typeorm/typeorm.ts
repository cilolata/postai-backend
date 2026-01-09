import "dotenv/config";
import path from "path";
import { DataSource } from "typeorm";
import { createClient } from "@supabase/supabase-js";

// Lendo variáveis de ambiente
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

// Criando cliente Supabase (opcional, caso queira usar depois)
const database = createClient("https://bymytsaevbrbdojeevty.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bXl0c2FldmJyYmRvamVldnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5ODY4NDUsImV4cCI6MjA2OTU2Mjg0NX0.1rxYRXAvyW_749ZvIzYkSmJPb5l0qPlQu5dyISa4tP8");

// Configuração principal do DataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  url: "https://bymytsaevbrbdojeevty.supabase.co",
  port: parseInt(process.env.DB_PORT || "5432"),
  synchronize: false,
  ssl: true,
  logging: true,
  poolSize: 15,
  extra: {
    options: "-c timezone=UTC",
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  },
  entities: [
    path.join(__dirname, "../../entities/*{.ts,.js}")
  ],
  migrations: [
    path.join(__dirname, "../../lib/migrations/*{.ts,.js}")
  ],
});

// Inicialização condicional para evitar erro nos testes
// if (process.env.NODE_ENV !== "test") {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database with typeorm connected");
      return AppDataSource.runMigrations();
    })
    .catch((err) => console.error(`Database with typeorm erro: ${err}`));
// }
