import Users from "../collections/Links";
import { Meteor } from "meteor/meteor";

let userManagement;

if (Meteor.isServer) {
    class UserManagement {
        register(newUser) {
            return Users.insert({ ...contact });
        }

        update(contact) {
            return Contacts.update({ _id: contact._id, patientId: Meteor.userId() }, { $set: { ...contact } });
        }

        createOrUpdate(contact) {
            return contact._id ? this.update(contact) : this.create(contact);
        }
    }
    userManagement = new UserManagement();
}

export default userManagement;