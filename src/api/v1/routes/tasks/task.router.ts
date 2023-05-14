import express, { Express, Request, Response } from "express";
import TaskController from "../../controllers/tasks/task.controller";

const router = express.Router();
const taskController = new TaskController();

/* /tasks */
router
  .route("/")
  .get(taskController.getAllTasks.bind(taskController))
  .post(taskController.createTask.bind(taskController))
  .delete(taskController.deleteTasks.bind(taskController));

export default router;
