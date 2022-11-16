import ToDos from "../collections/ToDos";
import { Meteor } from "meteor/meteor";
import { random } from "lodash";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        createOrUpdate(toDo, moduleName) {
            Object.assign(toDo, { completed: false });
            //Object.assign(toDo, { _id: new Meteor.Collection.ObjectID() })
            let moduleToDo = ToDos.findOne({ moduleName });
            let newToDos = [{...toDo }];
            if (moduleToDo) {
                this.update(toDo, moduleToDo);
            } else {
                this.createModuleToDo(moduleName, newToDos);
            }
        }

        createModuleToDo(moduleName, newToDos) {
            return ToDos.insert({
                toDos: newToDos,
                moduleName: moduleName,
                creator: Meteor.userId(),
            });
        }

        update(toDo, moduleToDo) {
            moduleToDo.toDos.push(toDo);
            return ToDos.update({ _id: moduleToDo._id }, { $set: { toDos: moduleToDo.toDos } });
        }

        delete(toDo) {
            let moduleToDos = ToDos.find().fetch();
            let parentmoduleToDo
            moduleToDos.forEach((moduleToDo) => {
                let toDoIndex = moduleToDo.toDos.findIndex(
                    (toDoToDelete) => toDo.name === toDoToDelete.name
                );
                if (toDoIndex !== -1) {
                    moduleToDo.toDos.splice(toDoIndex, 1);
                    parentmoduleToDo = moduleToDo
                    return ToDos.update({ _id: parentmoduleToDo._id }, { $set: { toDos: parentmoduleToDo.toDos } })
                }
            });
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;