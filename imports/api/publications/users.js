import {Meteor} from "meteor/meteor";
import Users from "../collections/Users";


if (Meteor.isServer) {
    Meteor.publish(null, () => {
       
            return Users.find()
        
    });
}