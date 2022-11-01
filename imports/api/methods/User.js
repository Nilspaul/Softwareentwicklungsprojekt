
import {Meteor} from "meteor/meteor";
import usersManagement from "../management/UsersManagement"
Meteor.methods({
   'user.create'(user) {
      usersManagement.create(user)
   },
   'user.login'(user) {
      usersManagement.login(user)
   },
   'user.logout'() {
      usersManagement.logout();
   },
});
