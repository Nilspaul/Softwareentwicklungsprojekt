import {Meteor} from "meteor/meteor";
import {check, Match} from "meteor/check";
import usersManagement from "../management/UsersManagement"
Meteor.methods({
   'user.create'(user) {
      usersManagement.create(user)
   },
   'user.delete'(_id) {
      check(_id, String)
      usersManagement.delete(_id)
   },
   'user.createOrUpdate'(user) {
      usersManagement.createOrUpdate(user)
   },
});