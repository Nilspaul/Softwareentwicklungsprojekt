
import ToDos from '../collections/ToDos';
import { Meteor } from "meteor/meteor";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        createToDo(toDo) {
            toDo.creator = Meteor.userId();
            ToDos.insert({...toDo});
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;