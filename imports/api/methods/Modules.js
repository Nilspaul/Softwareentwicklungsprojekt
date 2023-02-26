import { Meteor } from "meteor/meteor";
import modulesManagement from "../management/ModulesManagement"
Meteor.methods({
    'module.findModule' (moduleName) {
       return modulesManagement.findModule(moduleName);
    },
});