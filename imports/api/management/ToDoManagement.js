import ToDos from "../collections/ToDos";
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";

let toDoManagement;

if (Meteor.isServer) {
    class ToDoManagement {
        update(toDo) {
            return ToDos.update({ _id: toDo._id }, { $set: { ...toDo }});
        }
        
        delete(toDo) {
           ToDos.remove({_id: toDo._id})
        }
        
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

            return ToDos.insert({...toDo})
        }

        findToDoByName(name) {
            return ToDos.find({name: name}).fetch();
        }
    }
    toDoManagement = new ToDoManagement();
}

export default toDoManagement;