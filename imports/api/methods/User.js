
import {Meteor} from "meteor/meteor";
import usersManagement from "../management/UsersManagement"
import { check } from 'meteor/check'
import nodemailer from 'nodemailer';
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
   'users.resetPassword' (email) {
      return usersManagement.resetPassword(email);
    },
});
