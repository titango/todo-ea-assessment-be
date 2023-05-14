import { Request, Response } from "express";
import TaskService from "../services/task.service";

class TasksController {
  private service: TaskService;

  constructor(service: TaskService) {
    this.service = service;
  }

  getAllTasks(req: Request, res: Response) {
    const allTasks = this.service.getAllTasks();
  }
  createTask(req: Request, res: Response) {}
  updateTask(req: Request, res: Response) {}
  deleteTasks(req: Request, res: Response) {}
}

export default TasksController;
