import { Meteor } from "meteor/meteor";
import ToDos from "../collections/ToDos";
Meteor.publish('toDos', () => {
    return ToDos.find({$or: [{public: true}, {creator: Meteor.userId()}]})
});