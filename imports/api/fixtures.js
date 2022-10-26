import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import ToDos from './collections/ToDos';
const SEED_USERNAME = 'Nils';
const SEED_PASSWORD = '1234';
const SEED_EMAIL = "nils.paul@iem.thm.de"

const staticToDo = {
    name: "myFirstToDo",
    note: "Do something"
}
Meteor.startup(() => {
    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
            email: SEED_EMAIL,
        });

        ToDos.insert({...staticToDo })
    }
})