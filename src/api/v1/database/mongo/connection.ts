import mongoose from "mongoose";
import Singleton from "../../models/singleton";

const MONGO_URL = "mongodb://user:password@127.0.0.1:27017/mydb";

class Mongo extends Singleton {
  public connect() {
    mongoose.Promise = Promise;
    if (mongoose.connection.readyState !== 1) {
      mongoose.connect(MONGO_URL);
      mongoose.connection.on("error", (error: Error) => {
        console.log("error");
      });
      mongoose.connection.on("connecting", () => {
        console.log("connecting");
      });
      mongoose.connection.on("connected", () => {
        console.log("connected");
      });
      mongoose.connection.on("disconnecting", () => {
        console.log("disconnecting");
      });
      mongoose.connection.on("disconnected", () => {
        console.log("disconnected");
      });
    }
  }

  public getStatus(): number {
    return mongoose.connection.readyState;
  }
}

export default Mongo;
