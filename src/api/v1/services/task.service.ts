import { ITask } from "../@types/tasks.type";
import tasksDao from "../daos/tasks.dao";

class TaskService {
  getAllTasks() {
    return tasksDao.getTasks();
  }
  createTask(values: ITask) {
    return tasksDao.createTask(values);
  }
  updateTask(id: string, values: ITask) {
    return tasksDao.updateTaskById(id, values);
  }
  deleteTasks() {
    return tasksDao.deleteTasks();
  }
}

export default TaskService;
