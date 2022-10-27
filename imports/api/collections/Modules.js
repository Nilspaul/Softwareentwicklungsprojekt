import { Mongo } from 'meteor/mongo';
const Modules = new Mongo.Collection('modules');

if (Meteor.isServer) {
    Modules.createIndex({ name: 'text' });
}

export default Modules;