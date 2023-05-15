import { Request, Response } from "express";
import TaskService from "../services/task.service";

class TasksController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  async getTasks(req: Request, res: Response) {
    const allTasks = await this.service.getTasks();
    res.status(200).json(allTasks);
  }

  async createTask(req: Request, res: Response) {
    const body = req.body;
    const created = await this.service.createTask(body);
    if (created) {
      res.status(200).json(created);
    } else {
      res.status(500).json({ error: "Failed to create new task" });
    }
  }
  async updateTask(req: Request, res: Response) {
    const body = req.body;
    const id = req.params.id;
    const updated = await this.service.updateTask(id, body);
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(500).json({ error: "Failed to update new task" });
    }
  }
  async deleteTasks(req: Request, res: Response) {
    const deleted = await this.service.deleteTasks();
    if (deleted) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ error: "Failed to delete tasks" });
    }
  }
}

export default TasksController;
