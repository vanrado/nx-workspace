import {User} from "../../types/user";
import {AuthHelper} from "../../services/AuthHelper";

const Mutations = {
  signUp: async (_: any, args: { data: Partial<User> }, request: any) => {
    const { email, password } = args.data;

    return AuthHelper.signUp({ email, password, request });
  }
}

export default Mutations;
