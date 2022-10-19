import {Mongo} from 'meteor/mongo';
const Users = new Mongo.Collection('users');

Users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});

if (Meteor.isServer) {
    Users.createIndex({ name: 'text'});
}

export default Users;