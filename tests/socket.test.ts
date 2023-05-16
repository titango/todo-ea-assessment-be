import { createServer } from "http";
import { Server, Socket } from "socket.io";
const Client = require("socket.io-client");
import mongoose from "mongoose";
import { AddressInfo } from "net";

import SocketService from "../src/api/v1/services/socket.service";
import TaskService from "../src/api/v1/services/task.service";

const taskId = new mongoose.Types.ObjectId().toString();
const taskPayload = {
  _id: taskId,
  title: "First",
  isCompleted: false,
  createdAt: "2023-05-16T03:31:39.831Z",
  updatedAt: "2023-05-16T03:31:39.831Z",
};

describe("Socket.IO updated test", () => {
  let io: Server,
    serverSocket: Socket,
    clientSocket: any,
    socketService: SocketService;

  beforeAll((done) => {
    const httpServer = createServer();
    socketService = SocketService.getInstance<SocketService>();
    socketService.connectServer(httpServer);
    io = new Server(httpServer);

    httpServer.listen(() => {
      let port = 3000;
      let add = httpServer.address();
      if ((add as AddressInfo).port) {
        port = (add as AddressInfo).port;
      }
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should emit and receive "updateTask" event with correct data', (done) => {
    const taskFunc = jest
      .spyOn(TaskService.prototype, "getTasks")
      // @ts-ignore
      .mockReturnValueOnce([taskPayload]);
    socketService.execTaskUpdated();

    // Simulate the server handling the event and emitting a response
    clientSocket.on("taskUpdated", (receivedTasks: any) => {
      // Verify the emitted event and data
      expect(receivedTasks).toEqual(taskPayload);
      done();
    });

    // Simulate the client emitting the event
    serverSocket.emit("taskUpdated", taskPayload);
  });
});
