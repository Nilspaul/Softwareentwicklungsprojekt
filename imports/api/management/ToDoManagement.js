import ToDos from "../collections/ToDos";
import { Meteor } from "meteor/meteor";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        createOrUpdate(toDo, moduleName) {
            Object.assign(toDo, { completed: false });
            //Object.assign(toDo, { _id: new Meteor.Collection.ObjectID() })
            let moduleToDo = ToDos.findOne({ moduleName });
            let newToDos = [{...toDo }];
            if (moduleToDo) {
                this.updateModuleToDo(toDo, moduleToDo);
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

        updateModuleToDo(toDo, moduleToDo) {
            moduleToDo.toDos.push(toDo);
            return ToDos.update({ _id: moduleToDo._id }, { $set: { toDos: moduleToDo.toDos } });
        }

        updateSubToDo(updatedToDo) {
            let myToDos = ToDos.find().fetch();
            myToDos.forEach((myToDo) => {
                let toDoIndex = myToDo.toDos.findIndex((toDo) => toDo.name === updatedToDo.name);
                if (toDoIndex !== -1) {
                    myToDo.toDos[toDoIndex] = updatedToDo
                }
                return ToDos.update({ _id: myToDo._id }, { $set: { toDos: myToDo.toDos } })
            })
        }

        delete(toDo) {
            let moduleToDos = ToDos.find().fetch();
            moduleToDos.forEach((moduleToDo) => {
                let toDoIndex = moduleToDo.toDos.findIndex(
                    (toDoToDelete) => toDo.name === toDoToDelete.name
                );
                if (toDoIndex !== -1) {
                    moduleToDo.toDos.splice(toDoIndex, 1);
                    return ToDos.update({ _id: moduleToDo._id }, { $set: { toDos: moduleToDo.toDos } })
                }
            });
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;