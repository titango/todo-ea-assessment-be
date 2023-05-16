import express, { Express, Request, Response } from "express";
import TasksController from "../controllers/tasks.controller";
import TaskService from "../services/task.service";

const router = express.Router();
const tasksController = new TasksController(new TaskService());

/* /tasks */
router
  .route("/")
  .get(tasksController.getTasks.bind(tasksController))
  .post(tasksController.createTask.bind(tasksController))
  .delete(tasksController.deleteTasks.bind(tasksController));

router.route("/search").get(tasksController.searchTasks.bind(tasksController));

router
  .route("/:id")
  .put(tasksController.updateTask.bind(tasksController))
  .delete(tasksController.deleteTaskById.bind(tasksController));

export default router;
