import { Meteor } from "meteor/meteor";
import subscribedModules from "../collections/SubscribedModules";
Meteor.publish('subscribedModules', () => {
    return subscribedModules.find();
});