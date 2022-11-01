import { Mongo } from 'meteor/mongo';
const SubscribedModules = new Mongo.Collection('subscribedModules');

export default SubscribedModules;