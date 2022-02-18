import { Mongo } from 'meteor/mongo';

const Orders = new Mongo.Collection('order');

export default Orders;