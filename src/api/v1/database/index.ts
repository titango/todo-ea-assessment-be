import Singleton from "../models/singleton";
import Mongo from "./mongo/connection";
import mongoConnection from "./mongo/connection";

class Database extends Singleton {
  constructor() {
    super();
  }

  connect() {
    // Using Mongo connection
    const mongo: Mongo = mongoConnection.getInstance<Mongo>();
    mongo.connect();
  }
}

export default Database;
