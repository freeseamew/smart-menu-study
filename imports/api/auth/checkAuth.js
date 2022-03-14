const checkAuth = (user, role) => {
  if(!user) throw 'not Login';
  if(user.profile.role !== role) throw 'not authorized';
}

export default checkAuth;