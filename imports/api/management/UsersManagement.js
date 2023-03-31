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
        profile: {    
          adressLine: user.adressLine||'',
          houseNumber:  user.houseNumber||'',
          city: user.city||'',
          state: user.state||'',
          zip: user.zip||'',
          country: user.country||'',
        }
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
    
    updateLastLogin() {
      Meteor.users.update({_id: Meteor.userId()}, {$set: {"lastLogin": new Date()}})
    }

    setFirstLogin() {
      Meteor.users.update({_id: Meteor.userId(), "firstLogin": {$exists: false}}, {$set: {"firstLogin": new Date()}})
    }
  }

  usersManagement = new UsersManagement();
}

export default usersManagement;
