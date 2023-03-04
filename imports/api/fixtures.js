import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import Modules from "./collections/Modules";
import ToDos from "./collections/ToDos";
import modules from "../../data/specificModules.json";
import { Random } from "meteor/random";
import setMailUrl from "./emails/setMailUrl";
import dayjs from "dayjs";

const SEED_USERNAME = "Nils";
const SEED_PASSWORD = "1234";
const SEED_EMAIL = "nils.paul@iem.thm.de";
const startDate = new Date();

const myToDos = {
  toDos: [
    {
      _id: Random.id(),
      name: "Mein ToDo",
      note: "Mache etwas sinnvolles",
      start: startDate,
      end: dayjs(startDate).add(1, 'day').$d,
      priority: 'High',
      timed: false,
      description: 'test'
    },
  ],
  moduleName: "MyModuleName",
  public: true,
};

Meteor.startup(() => {
  Accounts.emailTemplates.siteName = "THMStudyPlanner";
  Accounts.emailTemplates.from = "THMStudyPlanner THMStudyPlanner@gmail.com";
  Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl("reset-password/" + token);
  };
  Accounts.emailTemplates.resetPassword.html = function (user, url) {
    return `<h4>Dies ist eine automatische Nachricht von <b>THMStudyPlanner</b>. Antworten Sie nicht darauf.</h4>
        <p>Es wurde die Einrichtung eines neuen Passworts für Ihre Kennung <b>${user.emails[0].address}</b> angefordert.<br>
        Wenn Sie dies nicht veranlasst haben, so können Sie diese Nachricht ignorieren und löschen. Wenn Sie die Einrichtung eines neuen Passworts angefordert haben, so klicken Sie auf den Link unten oder kopieren Sie ihn und fügen ihn in die Adresszeile Ihres Browsers ein. Sie werden dann aufgefordert, ein neues Passwort zu wählen.</p>
        <a href="${url}">${url}</a>`;
  };

  setMailUrl();

  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: SEED_EMAIL,
    });
  }
/*
  if (!ToDos.findOne({ moduleName: myToDos.moduleName })) {
    ToDos.insert({ ...myToDos });
  }
*/
  modules.forEach((module) => {
    if (!Modules.findOne({ name: module.name })) {
      Modules.insert({ ...module });
    }
  });
});
