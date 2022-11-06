import {Meteor} from "meteor/meteor";
import toDoManagement from "../management/ToDoManagement"
Meteor.methods({
   'toDo.createOrUpdate'(toDo, moduleName) {
    toDoManagement.createOrUpdate(toDo, moduleName)
   },
});
