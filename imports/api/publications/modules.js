import { Meteor } from "meteor/meteor";
import Modules from "../collections/Modules";
Meteor.publish(null, () => {
    return Modules.find();
});