export const setUserInfo = userData => {
  return {type: 'SetUserData', data: userData};
};

export const setToken = token => {
  return {type: 'setToken', data: token};
};

export const LogoutUser = () => {
  return {type: 'UserLogout'};
};
