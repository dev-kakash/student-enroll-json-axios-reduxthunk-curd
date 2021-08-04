import * as types from "./actionTypes";
import axios from "axios";

const getPeople = (people) => ({
  type: types.GET_PEOPLE,
  payload: people,
});

const personDeleted = () => ({
  type: types.DELETE_PERSON,
});

const personAdded = () => ({
  type: types.ADD_PERSON,
});

const personGot = (person) => ({
  type: types.GET_PERSON,
  payload: person,
});

const personUpdated = () => ({
  type: types.UPDATE_PERSON,
});

export const loadPeople = () => {
  return function (dispatch) {
    axios
      .get("http://localhost:5000/people")
      .then((res) => {
        dispatch(getPeople(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePerson = (id) => {
  return function (dispatch) {
    axios
      .delete(`http://localhost:5000/people/${id}`)
      .then((res) => {
        dispatch(personDeleted(res.data));
        dispatch(getPeople());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addPerson = (person) => {
  return function (dispatch) {
    axios
      .post(`http://localhost:5000/people`, person)
      .then((res) => {
        dispatch(personAdded());
        dispatch(loadPeople());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getPerson = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:5000/people/${id}`)
      .then((res) => {
        dispatch(personGot(res.data));
        console.log(res.data);
        dispatch(loadPeople());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const updatePerson = (person, id) => {
  return function (dispatch) {
    axios
      .put(`http://localhost:5000/people/${id}`, person)
      .then((res) => {
        dispatch(personUpdated());
        dispatch(loadPeople());
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
