import * as types from "./actionTypes";

const initialState = {
  people: [],
  person: {},
  loading: true,
};

const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PEOPLE:
      return {
        ...state,
        people: action.payload,
        loading: false,
      };
    case types.DELETE_PERSON:
      return {
        ...state,
        people: action.payload,
        loading: false,
      };
    case types.ADD_PERSON:
      return {
        ...state,
        loading: false,
      };
    case types.GET_PERSON:
      return {
        ...state,
        person: action.payload,
        loading: false,
      };
    case types.UPDATE_PERSON:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default peopleReducer;
