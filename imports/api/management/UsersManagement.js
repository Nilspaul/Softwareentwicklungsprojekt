
import {Accounts} from 'meteor/accounts-base';
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
        login(user){
            Accounts.loginWithPassword(user.email, user.password)
        }
        update(contact) {
            return Users.update({ _id: contact._id }, { $set: {...contact } });
        }
        createOrUpdate(user) {
            return user._id ? this.update(user) : this.create(user);
        }

    }

    usersManagement = new UsersManagement();
}

export default usersManagement;