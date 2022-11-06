
import ToDos from '../collections/ToDos';
import { Meteor } from "meteor/meteor";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        createOrUpdate( toDo, moduleName) {
            let moduleToDo = ToDos.findOne({ moduleName });
            let newToDos = [{...toDo}];
            if (moduleToDo) {
                this.update(toDo, moduleToDo);
            } else {
                this.createModuleToDo(moduleName, newToDos)
            }
        }

        createModuleToDo(moduleName, newToDos) {
            return ToDos.insert({toDos: newToDos, moduleName: moduleName, creator: Meteor.userId()});
        }

        update(toDo, moduleToDo){
            moduleToDo.toDos.push(toDo)
            return ToDos.update({_id: moduleToDo._id}, {$set: {toDos: moduleToDo.toDos}})
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;