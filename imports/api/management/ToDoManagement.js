
import ToDos from '../collections/ToDos';
import { Meteor } from "meteor/meteor";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        createOrUpdate( toDo, moduleName) {
            let moduleToDo = ToDos.find({ moduleName }).fetch();
            let newToDos = [{...toDo}];
            if (moduleToDo.length > 0) {
                this.update(toDo, moduleToDo);
            } else {
                this.createModuleToDo(moduleName, newToDos)
            }
        }

        createModuleToDo(moduleName, newToDos) {
            return ToDos.insert({toDos: newToDos, moduleName: moduleName});
        }

        update(toDo, moduleToDo){
            moduleToDo.toDos.push(toDo)
            return ToDos.update({_id: moduleToDo._id}, {toDos: toDos})
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;