import Users from "../collections/users";
import { Meteor } from "meteor/meteor";

let userManagement;

if (Meteor.isServer) {
    class UserManagement {
        register(user) {
            return Users.insert({...user });
        }

        update(user) {
            return Users.update({ _id: user._id });
        }

        createOrUpdate(contact) {
            return user._id ? this.update(user) : this.create(user);
        }
    }
    userManagement = new UserManagement();
}

export default userManagement;