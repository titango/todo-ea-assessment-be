import { Request, Response } from "express";
import TaskService from "../services/task.service";
import mongoose from "mongoose";

class TasksController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  async getTasks(req: Request, res: Response) {
    try {
      const allTasks = await this.service.getTasks();
      res.status(200).json(allTasks);
    } catch (err) {
      res.status(500).send("Failed to retrieve all tasks");
    }
  }

  async createTask(req: Request, res: Response) {
    const body = req.body;
    if (!body || Object.keys(body).length === 0) {
      res.status(400).json("No data from client");
    } else {
      try {
        const created = await this.service.createTask(body);
        res.status(201).json(created);
      } catch (err) {
        res.status(500).send("Failed to create new task");
      }
    }
  }
  async updateTask(req: Request, res: Response) {
    const body = req.body;
    const id = req.params.id;
    if (!body || !id || Object.keys(body).length === 0) {
      res.status(400).json("No data from client");
    } else {
      try {
        const updated = await this.service.updateTask(id, body);
        res.status(201).json(updated);
      } catch (err) {
        res.status(500).json("Failed to update new task");
      }
    }
  }

  async deleteTaskById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const deleted = await this.service.deleteTaskById(id);
      res.status(201).json(deleted);
    } catch (err) {
      res.status(500).json({ error: "Failed to delete a task" });
    }
  }

  async deleteTasks(req: Request, res: Response) {
    try {
      await this.service.deleteTasks();
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete tasks" });
    }
  }

  async searchTasks(req: Request, res: Response) {
    const query = req.query.q;
    if (!query) {
      res.status(400).send("No query string found");
    } else {
      try {
        const searched = await this.service.searchTasks(query as string);
        res.status(200).json(searched);
      } catch (err) {
        res.status(500).json({ error: "Failed to search tasks" });
      }
    }
  }
}

export default TasksController;
