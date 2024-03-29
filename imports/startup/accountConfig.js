import { Accounts } from 'meteor/accounts-base';
import { USER, ADMIN } from '/imports/utils/constants';

Accounts.onCreateUser((options, user) => {
  if(options.email === 'admin@admin.com') {
    user.profile = options.profile ? options.profile : {};
    user.profile.role = ADMIN;
  }
  else {
    user.profile = options.profile ? options.profile : {};
    user.profile.role = USER;
  }

  return user;
});