import Users from "../collections/Users";
import { Meteor } from "meteor/meteor";

let usersManagement;

if (Meteor.isServer) {
    class UsersManagement {
        create(user) {
            return Users.insert({...user });
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