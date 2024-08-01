import express, { Application, NextFunction, Request, Response } from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router";
import cors from "cors";
import { createContext } from "./lib/trpc";

const app: Application = express();
app.use(cors());

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.json({ message: 'Hello world!' })
// })

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createContext,
  })
);

const PORT: number = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`);
});
// Graceful shutdown
process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    // Perform any necessary cleanup here
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
    // Perform any necessary cleanup here
    process.exit(0);
  });
});
