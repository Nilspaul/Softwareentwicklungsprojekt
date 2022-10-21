
import {Meteor} from "meteor/meteor";
import {check, Match} from "meteor/check";
import usersManagement from "../management/UsersManagement"
Meteor.methods({
   'user.create'(user) {
      console.log("test")
      usersManagement.create(user)
   },
   'user.login'(user) {
      console.log("login")
      usersManagement.login(user)
   },
   'user.createOrUpdate'(user) {
      usersManagement.createOrUpdate(user)
   },
});
