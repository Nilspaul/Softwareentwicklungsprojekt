import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";
import { check } from "meteor/check";

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

    resetPassword(email) {
      let user = Accounts.findUserByEmail(email);
      if (user) {
        return Accounts.sendResetPasswordEmail(user._id, user.emails[0].address);
      } else {
        throw new Meteor.Error("RESET_FAILED")
      }
    }
  }

  usersManagement = new UsersManagement();
}

export default usersManagement;
