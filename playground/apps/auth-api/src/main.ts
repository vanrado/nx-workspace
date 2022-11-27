import express = require("express");
import {DBHelper} from "./app/services/DBHelper";
import {SessionHelper} from "./app/services/SessionHelper";
import {AuthHelper} from "./app/services/AuthHelper";
import {UserSchema} from "./app/models/user-schema";

const port = process.env.port || 3333;
const app = express();
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
app.get('/api', (req, res) => {
  res.send({message: 'Welcome to api!'});
});
server.on('error', console.error);

DBHelper.init();
SessionHelper.init(app);
UserSchema.init();
AuthHelper.init(app);
