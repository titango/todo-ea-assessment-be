import mongoose from "mongoose";
import Singleton from "../../../helpers/singleton";

class Mongo extends Singleton {
  private port = 27017; //default
  private MONGO_URL =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URL || ""
      : `mongodb://user:password@127.0.0.1:${this.port}/mydb`;

  public connect() {
    mongoose.Promise = Promise;
    if (this.getStatus() !== 1) {
      try {
        mongoose.connect(this.MONGO_URL);
        this.logActions();
      } catch (err: any) {
        console.error(err.message);
        process.exit(1);
      }
    }
  }

  public getStatus(): number {
    return mongoose.connection.readyState;
  }

  private logActions() {
    mongoose.connection.on("error", (error: Error) => {
      console.log("error");
    });
    mongoose.connection.on("connecting", () => {
      console.log(`connecting to mongodb on port ${this.port}`);
    });
    mongoose.connection.on("connected", () => {
      console.log(`connected to mongodb on port ${this.port}`);
    });
    mongoose.connection.on("disconnecting", () => {
      console.log("disconnecting");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("disconnected");
    });
  }
}

export default Mongo;
