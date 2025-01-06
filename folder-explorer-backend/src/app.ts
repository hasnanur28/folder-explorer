import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { folderRoutes } from "./routes/routes";

const app = new Elysia()
  .use(cors())
  
folderRoutes(app); // Tambahkan routing folder

export default app;