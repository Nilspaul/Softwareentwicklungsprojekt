import { Mongo } from 'meteor/mongo';
const SubscribedModules = new Mongo.Collection('subscribedModules');

if (Meteor.isServer) {
    SubscribedModules.createIndex({ name: 'text' });
}

export default SubscribedModules;