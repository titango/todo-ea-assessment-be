import request from "supertest";

import TaskService from "../../src/api/v1/services/task.service";
import app from "../../src/app";
import mongoose from "mongoose";

const taskId = new mongoose.Types.ObjectId().toString();

const taskPayload = {
  _id: taskId,
  title: "First",
  isCompleted: false,
  createdAt: "2023-05-16T03:31:39.831Z",
  updatedAt: "2023-05-16T03:31:39.831Z",
};

describe("tasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // GET TASKS
  describe("get tasks", () => {
    it("should returns success", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "getTasks")
        // @ts-ignore
        .mockReturnValueOnce([taskPayload]);
      const { statusCode, body } = await request(app).get("/api/v1/tasks");
      expect(statusCode).toBe(200);
      expect(body).toStrictEqual([taskPayload]);
      expect(taskFunc).toHaveBeenCalled();
    });

    it("should returns error", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "getTasks")
        // @ts-ignore
        .mockRejectedValueOnce("Failed to retrieve all tasks");
      const { statusCode } = await request(app).get("/api/v1/tasks");
      expect(statusCode).toBe(500);
      expect(taskFunc).toHaveBeenCalled();
    });
  });

  // CREATE TASKS
  describe("create tasks", () => {
    it("should returns success", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "createTask")
        // @ts-ignore
        .mockReturnValueOnce(taskPayload);
      const { statusCode, body } = await request(app)
        .post("/api/v1/tasks")
        .send(taskPayload);
      expect(statusCode).toBe(201);
      expect(body).toStrictEqual(taskPayload);
      expect(taskFunc).toHaveBeenCalled();
    });

    it("should returns error from client", async () => {
      const { statusCode } = await request(app).post("/api/v1/tasks").send({});
      expect(statusCode).toBe(400);
    });

    it("should returns error from server", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "createTask")
        // @ts-ignore
        .mockRejectedValueOnce("Failed to create a task");
      const { statusCode } = await request(app)
        .post("/api/v1/tasks")
        .send(taskPayload);
      expect(statusCode).toBe(500);
      expect(taskFunc).toHaveBeenCalled();
    });
  });

  // UPDATE TASK
  describe("update task", () => {
    it("should returns success", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "updateTask")
        // @ts-ignore
        .mockReturnValueOnce(taskPayload);
      const { statusCode, body } = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send(taskPayload);
      expect(statusCode).toBe(201);
      expect(body).toStrictEqual(taskPayload);
      expect(taskFunc).toHaveBeenCalled();
    });

    it("should returns error from client", async () => {
      const { statusCode } = await request(app)
        .put(`/api/v1/tasks/${taskId}`)
        .send({});
      expect(statusCode).toBe(400);
    });

    it("should returns error from server", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "createTask")
        // @ts-ignore
        .mockRejectedValueOnce("Failed to update a task");
      const { statusCode } = await request(app)
        .post("/api/v1/tasks")
        .send(taskPayload);
      expect(statusCode).toBe(500);
      expect(taskFunc).toHaveBeenCalled();
    });
  });

  // DELETE TASK
  describe("delete task by id", () => {
    it("should returns success", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "deleteTaskById")
        // @ts-ignore
        .mockReturnValueOnce(taskPayload);
      const { statusCode, body } = await request(app).delete(
        `/api/v1/tasks/${taskId}`
      );
      expect(statusCode).toBe(201);
      expect(body).toStrictEqual(taskPayload);
      expect(taskFunc).toHaveBeenCalled();
    });

    it("should returns error from server", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "deleteTaskById")
        // @ts-ignore
        .mockRejectedValueOnce("Failed to update a task");
      const { statusCode } = await request(app).delete(
        `/api/v1/tasks/${taskId}`
      );
      expect(statusCode).toBe(500);
      expect(taskFunc).toHaveBeenCalled();
    });
  });

  // DELETE TASK
  describe("delete tasks", () => {
    it("should returns success", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "deleteTasks")
        // @ts-ignore
        .mockReturnValueOnce({ success: true });
      const { statusCode, body } = await request(app).delete("/api/v1/tasks");
      expect(statusCode).toBe(200);
      expect(body).toStrictEqual({ success: true });
      expect(taskFunc).toHaveBeenCalled();
    });

    it("should returns error from server", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "deleteTasks")
        // @ts-ignore
        .mockRejectedValueOnce("Failed to update a task");
      const { statusCode } = await request(app).delete("/api/v1/tasks");
      expect(statusCode).toBe(500);
      expect(taskFunc).toHaveBeenCalled();
    });
  });

  // SEARCH TASKS
  describe("search tasks", () => {
    it("should returns success", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "searchTasks")
        // @ts-ignore
        .mockReturnValueOnce([taskPayload]);
      const { statusCode, body } = await request(app).get(
        "/api/v1/tasks/search?q=First"
      );
      expect(statusCode).toBe(200);
      expect(body).toStrictEqual([taskPayload]);
      expect(taskFunc).toHaveBeenCalled();
    });

    it("should returns error from client", async () => {
      const { statusCode } = await request(app).get(`/api/v1/tasks/search`);
      expect(statusCode).toBe(400);
    });

    it("should returns error", async () => {
      const taskFunc = jest
        .spyOn(TaskService.prototype, "searchTasks")
        // @ts-ignore
        .mockRejectedValueOnce("Failed to search all tasks");
      const { statusCode } = await request(app).get(
        "/api/v1/tasks/search?q=NotValid"
      );
      expect(statusCode).toBe(500);
      expect(taskFunc).toHaveBeenCalled();
    });
  });
});
