import passport, { Profile } from "passport";
import { Express } from "express";
import LocalStrategy from "passport-local";
import mongoose from "mongoose";
import { USER_SCHEMA_NAME } from "../config";
import { User } from "../types/user";

export class AuthHelper {
  static userModel: mongoose.Model<User>;
  // Passport is wired into express as a middleware. When a request comes in,
  // Passport will examine the request's session (as set by the above config) and
  // assign the current user to the 'req.user' object.  See also services/auth.js
  static init(app: Express): void {
    this.userModel = mongoose.model(USER_SCHEMA_NAME);
    app.use(passport.initialize());
    app.use(passport.session());
    // SerializeUser is used to provide some identifying token that can be saved
    // in the users session.  We traditionally use the 'ID' for this.
    passport.serializeUser((user: Profile, done) => {
      done(null, user.id);
    });
    // The counterpart of 'serializeUser'.  Given only a user's ID, we must return
    // the user object.  This object is placed on 'req.user'.
    passport.deserializeUser((id, done) => {
      this.userModel.findById(id, (err, user) => {
        done(err, user);
      });
    });
    // Instructs Passport how to authenticate a user using a locally saved email
    // and password combination.  This strategy is called whenever a user attempts to
    // log in.  We first find the user model in MongoDB that matches the submitted email,
    // then check to see if the provided password matches the saved password. There
    // are two obvious failure points here: the email might not exist in our DB or
    // the password might not match the saved one.  In either case, we call the 'done'
    // callback, including a string that messages why the authentication process failed.
    // This string is provided back to the GraphQL client.
    passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      this.userModel.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, "Invalid Credentials");
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, "Invalid credentials.");
        });
      });
    }));
  }


  // Creates a new user account.  We first check to see if a user already exists
  // with this email address to avoid making multiple accounts with identical addresses
  // If it does not, we save the existing user.  After the user is created, it is
  // provided to the 'req.logIn' function.  This is apart of Passport JS.
  // Notice the Promise created in the second 'then' statement.  This is done
  // because Passport only supports callbacks, while GraphQL only supports promises
  // for async code!  Awkward!
  static signUp({ email, password, request }): Promise<unknown> {
    const user = new this.userModel({ email, password });
    if (!email || !password) {
      throw new Error("You must provide an email and password.");
    }

    return this.userModel.findOne({ email })
      .then(existingUser => {
        if (existingUser) {
          throw new Error("Email in use");
        }
        return user.save();
      })
      .then(newUser => {
        return new Promise((resolve, reject) => {
          request.logIn(newUser, (err) => {
            if (err) {
              reject(err);
            }
            resolve(newUser);
          });
        });
      });
  }

  // Logs in a user.  This will invoke the 'local-strategy' defined above in this
  // file. Notice the strange method signature here: the 'passport.authenticate'
  // function returns a function, as its indended to be used as a middleware with
  // Express.  We have another compatibility layer here to make it work nicely with
  // GraphQL, as GraphQL always expects to see a promise for handling async code.
  static login({ email, password, req }): Promise<void> {
    return new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user) => {
        if (!user) {
          reject("Invalid credentials.");
        }

        req.login(user, () => resolve(user));
      })({ body: { email, password } });
    });
  }
}
