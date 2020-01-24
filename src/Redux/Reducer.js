const initialState = {
  token: null,
  userInfo: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setToken':
      return { ...state, token: action.data };
    case 'SetUserData':
      console.warn("Action.data", action.data)
      return { ...state, userInfo: action.data };

    case 'UserLogout':
      return { ...state, user: null, userInfo: null };
  }
};
export default reducer;
