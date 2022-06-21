import { Accounts } from 'meteor/accounts-base';

Meteor.setTimeout(() => {
  const userCount = Meteor.users.find().count();
  if(userCount === 0) {
    console.log('user create');

    const userValues = {
      email: 'admin@admin.com',
      password: process.env.ADMIN_PASSWORD,
    }

    Accounts.createUser(userValues);
  }
  else {
    console.log(`user count: ${userCount}`);
  }
}, 3000);