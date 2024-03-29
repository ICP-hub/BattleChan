// reducers/nameReducer.js
const initialState = {
    name: '',
  };
  
  const nameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NAME':
        return {
          ...state,
          name: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default nameReducer;
  