import http from "http";

import app from "./app";
import Database from "./api/v1/database";

const scheme = process.env.SCHEME;
const host = process.env.HOST;
const port = process.env.PORT;
const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at ${scheme}://${host}:${port}`);
  // Connect Database
  const db: Database = Database.getInstance<Database>();
  db.connect();
});
