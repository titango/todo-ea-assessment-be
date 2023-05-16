import http from "http";
import { Server } from "socket.io";

import app from "./app";
import Database from "./api/v1/database";
import SocketService from "./api/v1/services/socket.service";

const scheme = process.env.SCHEME;
const host = process.env.HOST;
const port = process.env.PORT;
const server = http.createServer(app);

const socketService = SocketService.getInstance<SocketService>();
socketService.connectServer(server);

setInterval(() => {
  socketService.execTaskUpdated();
}, 10 * 1000);

server.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at ${scheme}://${host}:${port}`);
  // Connect Database
  const db: Database = Database.getInstance<Database>();
  db.connect();
});
