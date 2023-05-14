abstract class Singleton {
  private static _instance: any;

  constructor() {}

  public static getInstance<T>(): T {
    if (!this._instance) {
      var me: any = this;
      this._instance = new me();
    }

    return this._instance as T;
  }
}

export default Singleton;
