import { Mongo } from 'meteor/mongo';
const ToDos = new Mongo.Collection('toDos');

if (Meteor.isServer) {
    ToDos.createIndex({ name: 'text' });
}

export default ToDos;