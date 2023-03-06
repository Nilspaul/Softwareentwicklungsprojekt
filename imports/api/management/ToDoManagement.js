import ToDos from "../collections/ToDos";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        /*
        createOrUpdate(toDo, moduleName) {
            Object.assign(toDo, { completed: false });
            Object.assign(toDo, { _id: Random.id() });
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
                let toDoIndex = myToDo.toDos.findIndex((toDo) => toDo._id === updatedToDo._id);
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
        */
        createMyToDo(toDo) {
            switch (toDo.priority) {
                case "High":
                  Object.assign(toDo, { color: "#e55353" });
                  break;
                case "Medium":
                  Object.assign(toDo, { color: "#f4aa00" });
                  break;
                case "Low":
                  Object.assign(toDo, { color: "#75cddb" });
                  break;
                  case "completed":
                  Object.assign(toDo, { color: "grey" });
              }
            Object.assign(toDo, { creator: Meteor.userId() });
            Object.assign(toDo, { _id: Random.id() });
            console.log(toDo)

            return ToDos.insert({...toDo})
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;