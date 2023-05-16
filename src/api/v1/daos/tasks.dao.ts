import Task from "../models/task";
import { Types } from "mongoose";

// DAO class - created for connecting to ORM of database
// Also in case of switching database, we do not mess up with Service classes.
class TasksDao {
  getTasks(query: Record<string, any>) {
    return Task.find(query, null, { sort: { title: 1 }, lean: true });
  }

  getTask(id: Types.ObjectId | string) {
    return Task.findById(id, null, { lean: true });
  }

  async createTask(values: Record<string, any>) {
    try {
      const savedObj = await new Task(values).save();
      return savedObj.toObject();
    } catch (err) {
      return {};
    }
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
