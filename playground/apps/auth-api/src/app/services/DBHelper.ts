import * as mongoose from 'mongoose';
import {MONGOOSE_URI} from "../config";

export class DBHelper {

  static init(): void {
    mongoose.connect(MONGOOSE_URI).then(() => console.log('Connection to Mongoose DB Successful')).catch((e: Error) => console.log(`Could not connect to mongo.\n\n${e}`));
  }
}
