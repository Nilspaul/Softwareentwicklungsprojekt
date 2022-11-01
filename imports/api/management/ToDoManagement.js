
import {toDos} from '../collections/ToDos';
import { Meteor } from "meteor/meteor";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        insertToDo(toDo) {
            toDo.creator = Meteor.userId();
            toDos.insert({...toDo})
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;