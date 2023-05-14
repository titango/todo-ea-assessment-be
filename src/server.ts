import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

import Database from "./api/v1/database";
import { TaskRouter } from "./api/v1/routes";
import { IError } from "./api/v1/@types/error.type";

const app: Express = express();
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());

dotenv.config();

const port = process.env.PORT;
const server = http.createServer(app);
const apiVersion = 1;
const apiVersionRoutes = `v${apiVersion}`;

// Routes
app.use(`${apiVersionRoutes}/tasks`, TaskRouter);

// Catch-all route handler for invalid routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: IError = new Error("Invalid route");
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err: IError, req: Request, res: Response) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// Connect Database
const db: Database = Database.getInstance<Database>();
db.connect();
