import Task from "../models/task";
import { Types } from "mongoose";

// DAO class - created for connecting to ORM of database
// Also in case of switching database, we do not mess up with Service classes.
class TasksDao {
  getTasks() {
    return Task.find({}, null, { lean: true });
  }

  getTask(id: Types.ObjectId | string) {
    return Task.findById(id, null, { lean: true });
  }

  createTask(values: Record<string, any>) {
    return new Task(values).save().then((task) => task.toObject());
  }

  updateTaskById(id: Types.ObjectId | string, values: Record<string, any>) {
    return Task.findOneAndUpdate({ _id: id }, values, {
      new: true,
      lean: true,
    });
  }

  deleteTaskById(id: Types.ObjectId | string) {
    return Task.findOneAndDelete({ _id: id });
  }

  deleteTasks() {
    return Task.deleteMany({}, { lean: true });
  }
}

export default new TasksDao();
