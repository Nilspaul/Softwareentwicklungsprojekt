import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import usersManagement from "../management/UsersManagement";
import toDoManagement from "../management/ToDoManagement";
import dayjs from "dayjs";

if (Meteor.isServer) {
  Accounts.onLogin(() => {
    const user = Meteor.users.find({ _id: Meteor.userId() }).fetch();
    const myToDo = {
      name: "Lerne den THMStudyPlanner kennen",
      note: "Klick dich durch die Seiten und Funktionen der Applikation und erkunde deine Möglichkeiten",
      moduleName: "Generell",
      start: new Date(),
      end: dayjs(this.start).add(1, 'day').$d,
      priority: "Low",
      timed: false,
    };
      usersManagement.setFirstLogin();
      if (toDoManagement.findToDoByName(myToDo.name).length === 0) {
        toDoManagement.createMyToDo(myToDo);
      }
    
    usersManagement.updateLastLogin();
  });
}
