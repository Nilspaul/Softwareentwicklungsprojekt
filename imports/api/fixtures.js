import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Modules from "./collections/Modules";
import ToDos from "./collections/ToDos";
import modules from "../../data/specificModules.json";

const SEED_USERNAME = "Nils";
const SEED_PASSWORD = "1234";
const SEED_EMAIL = "nils.paul@iem.thm.de";

 const staticToDo = {
    "toDos": [
      {
        "name": "Mein ToDo",
        "note": "Mache etwas sinnvolles",
        "dueTo": "30.11.2022"
      }
    ],
    "moduleName": "MyModuleName",
    "public": true
 };

Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
            email: SEED_EMAIL,
        });
    }
    if (!ToDos.findOne({ moduleName: staticToDo.moduleName })) {
        ToDos.insert({...staticToDo })
    }

    modules.forEach((module) => {
        if (!Modules.findOne({ name: module.name })) {
            Modules.insert({...module });
        }
    })

});