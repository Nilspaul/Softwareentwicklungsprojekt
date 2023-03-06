import { Meteor } from "meteor/meteor";
import Modules from "../collections/Modules";
Meteor.publish('modules', () => {
    return Modules.find();
});