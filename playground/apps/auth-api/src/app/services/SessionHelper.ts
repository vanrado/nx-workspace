import {Express} from "express";
import session from "express-session";
import {MONGOOSE_URI} from "../config";
import MongoStore from "connect-mongo";
import {ConnectMongoOptions} from "connect-mongo/build/main/lib/MongoStore";

export class SessionHelper {
  static init(app: Express): void {
    // Configures express to use sessions.  This places an encrypted identifier
    // on the user cookie.  When a user makes a request, this middleware examines
    // the cookie and modifies the request object to indicate which user made the request
    // The cookie itself only contains the id of a session; more data about the session
    // are stored inside of MongoDB.
    const mongoStoreConnectionOptions: ConnectMongoOptions = {
      mongoUrl: MONGOOSE_URI,
    };
    app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: 'aaabbbccc',
      store: MongoStore.create(mongoStoreConnectionOptions)
    }));
  }
}
