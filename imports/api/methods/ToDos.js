import {Meteor} from "meteor/meteor";
import toDoManagement from "../management/ToDoManagement"
Meteor.methods({
   'toDo.createOrUpdate'(toDo, moduleName) {
    toDoManagement.createOrUpdate(toDo, moduleName)
   },
   'toDo.delete'(toDo){
      toDoManagement.delete(toDo);
   },
   'toDo.complete'(toDo){
      toDoManagement.complete(toDo)
   }
});
