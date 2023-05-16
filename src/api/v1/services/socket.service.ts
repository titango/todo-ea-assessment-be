import http from "http";
import { Server } from "socket.io";

import Singleton from "../../../helpers/singleton";
import TaskService from "./task.service";

class SocketService extends Singleton {
  private io: Server | null = null;

  public connectServer(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: `${process.env.CLIENT_SCHEME}://${process.env.CLIENT_HOST}${
          process.env.CLIENT_PORT ? `:${process.env.CLIENT_PORT}` : ""
        }`,
        methods: ["GET", "POST", "PUT", "DELETE"],
      },
    });
    this.io.on("connection", (socket) => {
      console.log(`User connected: ${socket.id}`);
    });
  }

  public async execTaskUpdated() {
    if (!this.io) return;
    try {
      const taskService = new TaskService();
      const allTasks = await taskService.getTasks();
      console.log("emitting");
      this.io.emit("taskUpdated", allTasks);
    } catch (err) {
      // Error emitting
    }
  }
}

export default SocketService;
