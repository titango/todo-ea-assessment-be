import { ITask } from "../@types/tasks.type";
import tasksDao from "../daos/tasks.dao";

class TaskService {
  getTasks() {
    return tasksDao.getTasks({});
  }

  createTask(values: ITask) {
    return tasksDao.createTask(values);
  }

  updateTask(id: string, values: ITask) {
    return tasksDao.updateTaskById(id, values);
  }

  deleteTaskById(id: string) {
    return tasksDao.deleteTaskById(id);
  }

  deleteTasks() {
    return tasksDao.deleteTasks();
  }

  searchTasks(title: string) {
    return tasksDao.getTasks({ title: { $regex: title, $options: "i" } });
  }
}

export default TaskService;
