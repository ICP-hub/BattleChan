// reducers/authReducer.js

const initialState = {
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;

// // authReducer.js
// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'AUTHENTICATE':
//       return {
// ...state,
//         isAuthenticated: true,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         isAuthenticated: false,
//       };
//     default:
//       return state;
//   }
// };
