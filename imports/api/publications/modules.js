import { Meteor } from "meteor/meteor";
import Modules from "../collections/ToDos";
Meteor.publish(null, () => {
    return Modules.find();
});