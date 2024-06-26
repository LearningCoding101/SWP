// store.js
import { createStore } from 'redux';

const initialState = { id: null }; // Initial state with an empty id

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ID':
      return { ...state, id: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
