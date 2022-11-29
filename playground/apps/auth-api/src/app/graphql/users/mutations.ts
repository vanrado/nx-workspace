import {User} from "../../types/user";
import {AuthHelper} from "../../services/AuthHelper";
import { PassportSubscriptionContext } from "graphql-passport";

const Mutations = {
  signUp: async (_: object, args: { data: Partial<User> }, request: Express.UnauthenticatedRequest) => {
    const {email, password} = args.data;

    return AuthHelper.signUp({email, password, request});
  },
  logOut: (_: object, __: object, request: Express.AuthenticatedRequest) => {
    const { user } = request;
    request.logout(null, () => console.log('logged out', { user, request }));
    return { user };
  },
  logIn: (_: object, args: { data: Partial<User> }, req: PassportSubscriptionContext<User, unknown>) => {
    const { email, password } = args.data;
    return AuthHelper.login({ email, password, req })
  }
}

export default Mutations;
