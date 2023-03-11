import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import usersManagement from '../management/UsersManagement';

if (Meteor.isServer) {
  Accounts.onLogin(() => {
    usersManagement.setFirstLogin()
    userManagement.updateLastLogin()
  });
}
