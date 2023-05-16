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

  async deleteTaskById(req: Request, res: Response) {
    const id = req.params.id;
    const deleted = await this.service.deleteTaskById(id);
    if (deleted) {
      res.status(200).json(deleted);
    } else {
      res.status(500).json({ error: "Failed to delete a task" });
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

  async searchTasks(req: Request, res: Response) {
    const query = req.query.q;
    console.log("query: ", query);
    const searched = await this.service.searchTasks(query as string);
    if (searched) {
      res.status(200).json(searched);
    } else {
      res.status(500).json({ error: "Failed to search tasks" });
    }
  }
}

export default TasksController;
