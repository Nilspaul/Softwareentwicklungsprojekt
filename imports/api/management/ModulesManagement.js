import Modules from '../collections/Modules';
import { Meteor } from "meteor/meteor";

let ModulesManagement;

if (Meteor.isServer) {
    class ModulesManagement {
        findModule(moduleName) {
            let module = Modules.findOne({name: moduleName});
            return module;
        }
    }
    modulesManagement = new ModulesManagement();
}

export default modulesManagement;