import express, { Express, Request, Response } from "express";
import TasksController from "../controllers/tasks.controller";
import TaskService from "../services/task.service";

const router = express.Router();
const tasksController = new TasksController(new TaskService());

/* /tasks */
router
  .route("/")
  .get(tasksController.getAllTasks.bind(tasksController))
  .post(tasksController.createTask.bind(tasksController))
  .delete(tasksController.deleteTasks.bind(tasksController));

export default router;
