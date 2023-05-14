import Singleton from "../../../helpers/singleton";
import Mongo from "./connection";
import mongoConnection from "./connection";

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
