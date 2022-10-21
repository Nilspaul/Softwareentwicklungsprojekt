import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


const SEED_USERNAME = 'Nils';
const SEED_PASSWORD = '1234';
const SEED_EMAIL = "nils.paul@iem.thm.de"

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      email: SEED_EMAIL,
    });
  }
});