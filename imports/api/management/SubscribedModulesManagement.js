import subscribedModules from '../collections/SubscribedModules';
import { Meteor } from "meteor/meteor";

let subscribedModulesManagement;

if (Meteor.isServer) {
    class SubscribedModulesManagement {
        subscribeModule(module) {
            if (!subscribedModules.findOne({ name: module.name })) {
                module.subscriber = Meteor.userId();
                subscribedModules.insert({...module });
            }
        }
    }
    subscribedModulesManagement = new SubscribedModulesManagement();
}

export default subscribedModulesManagement;