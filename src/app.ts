import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

import { TasksRouter } from "./api/v1/routes";
import { IError } from "./api/v1/@types/error.type";

const app: Express = express();
app.use(cors());
app.use(bodyParser.json());

if (process.env.NODE_ENV !== "production") dotenv.config();
else dotenv.config({ path: ".env.production" });

const apiVersion = 1;
const apiVersionRoutes = `v${apiVersion}`;

// Routes
app.use(`/api/${apiVersionRoutes}/tasks`, TasksRouter);

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

export default app;
