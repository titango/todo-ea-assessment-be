import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!!");
});

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
