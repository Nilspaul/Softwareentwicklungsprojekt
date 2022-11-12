import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";

let usersManagement;

if (Meteor.isServer) {
  class UsersManagement {
    create(user) {
      Accounts.createUser({
        username: user.name,
        password: user.password,
        email: user.email,
      });
    }
    login(user) {
      Accounts.loginWithPassword(user.email, user.password);
    }

    logout() {
      Meteor.logout();
    }
  }

  usersManagement = new UsersManagement();
}

export default usersManagement;
