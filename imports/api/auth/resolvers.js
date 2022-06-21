import { Accounts } from 'meteor/accounts-base';
import { ADMIN } from '/imports/utils/constans';
import checkAuth from '/imports/api/auth/checkAuth.js';

const mutations = {
  async loginWithPassword(_, {email, pwd}) {
    if(!email || !pwd) throw 'Unauthorized';

    const authenticatingUser = await Meteor.users.findOne({'emails.address': email});

    if(!authenticatingUser) throw 'UnAuthorized';
    if(!(authenticatingUser.services != null ? authenticatingUser.services.password : undefined)) throw 'Unauthorized';

    const passwordVerification = await Accounts._checkPassword(authenticatingUser, pwd);
    if(passwordVerification.error) throw 'Unauthorized';

    const authToken = await Accounts._generateStampedLoginToken();
    const hashedToken = await Accounts._hashLoginToken(authToken.token);

    await Accounts._insertHashedLoginToken(authenticatingUser._id, {hashedToken: hashedToken, when: authToken.when});

    return { authToken: authToken.token, userId: authenticatingUser._id};
  },
  async logout(_, {}, {user, userToken}) {

    console.log(`user: ${user._id}`)
    console.log(`userToken: ${userToken}`)
    if(!user || !userToken) throw 'Not Login';

    try {
      const hashedToken = await Accounts._hashLoginToken(userToken);
      await Accounts.destroyToken(user._id, hashedToken);
      return true;
    }
    catch(error) {
      throw error.message;
    }
  },
  async addUser(_, {email, pwd}, { user }) {
    const newUser = {
      email: email,
      password: pwd,
    }

    try{
      const result = await Accounts.createUser(newUser);
      return result;
    }
    catch(error) {
      throw error.message;
    }
  },
  async updateUserRole(_, {_id, role}, { user }) {
    try {
      checkAuth(user, ADMIN);
      if(user._id !== _id) {
        const result = await Meteor.users.update(
          {_id: _id},
          {$set: {'profile.role': role}}
        );
        return result;
      }
      return false;
    }
    catch(error) {
      throw error.message;
    }
  }
}

const queries = {
  async users(_, args, { user }, info) {
    try {
      checkAuth(user, ADMIN);
      const result = await Meteor.users.find();

      return result;
    }
    catch(error) {
      throw error.message;
    }
  },
  me(_, args, {user}, info) {
    console.log(`info: ${user}`)
    let userValue = {
      _id: user._id,
      emails: [
        {address: user.emails[0].address},
      ],
      profile: {
        role: user.profile.role,
      }
    }

    return userValue;
  }
}

const resolvers = {
  Mutation: mutations,
  Query: queries,
}

export default resolvers;