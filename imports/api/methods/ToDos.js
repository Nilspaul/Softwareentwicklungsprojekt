import {Meteor} from "meteor/meteor";
import toDoManagement from "../management/ToDoManagement"
Meteor.methods({
   'toDo.create'(toDo) {
    toDoManagement.createToDo(toDo)
   },
});
