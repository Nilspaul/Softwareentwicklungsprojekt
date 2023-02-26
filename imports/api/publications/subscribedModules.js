import { Meteor } from "meteor/meteor";
import subscribedModules from "../collections/SubscribedModules";
Meteor.publish(null, () => {
    return subscribedModules.find();
});