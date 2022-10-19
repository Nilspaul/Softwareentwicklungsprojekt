import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import userManagement from '../management/UserManagement'

Meteor.methods({
    'user.register'(user) {
       check(user.name, String)
       check(user.address, String)
       check(user.email, String)
 
       userManagement.register(user)
    },
})
