import {Meteor} from "meteor/meteor";
import subscribedModulesManagement from "../management/SubscribedModulesManagement"
Meteor.methods({
   'module.subscribe'(module) {
    subscribedModulesManagement.subscribe(module)
   },
});
