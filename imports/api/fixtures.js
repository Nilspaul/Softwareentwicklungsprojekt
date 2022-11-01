import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Modules from "./collections/Modules";
import ToDos from "./collections/ToDos";
import modules from "../../data/specificModules.json";

const SEED_USERNAME = "Nils";
const SEED_PASSWORD = "1234";
const SEED_EMAIL = "nils.paul@iem.thm.de";

const staticToDo = {
  name: "myFirstToDo",
  note: "Do something",
  moduleName: "MyModuleName",
};

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: SEED_EMAIL,
    });
  }
  if (!ToDos.findOne({ name: staticToDo.name })) {
    ToDos.insert({ ...staticToDo });
  }

  modules.forEach((module) => {
    if (!Modules.findOne({ name: module.name })) {
      Modules.insert({ ...module });
    }
  })
  
});
