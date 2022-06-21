import { Meteor } from 'meteor/meteor';
import dotenv from 'dotenv';
dotenv.config({
  path: `${process.env.PWD}/.env`
});

if(Meteor.isServer) {
  import '/imports/startup';
}