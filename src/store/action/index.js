import axios from 'axios';
import alertify from 'alertifyjs'

export function addTodo(newTodo) {
  return dispatch => {
    alertify.notify('Added new todo', 'addTodo', 2.5);
    dispatch({ type: 'ADD_TODO', payload: newTodo });
  };
};

export function deleteTodo(index) {
  return dispatch => {
    alertify.notify('Todo deleted', 'deleteTodo', 2.5);
    dispatch({ type: 'DELETE_TODO', payload: index });
  };
};

export function doneTodo(index) {
  return dispatch => {
    alertify.notify('Todo finished', 'doneTodo', 2.5);
    dispatch({ type: 'SET_DONE_TODO', payload: index }); 
  };
};

export function editTodo(payload) {
  return dispatch => {
    alertify.notify('Todo edited', 'doneTodo', 2.5);
    dispatch({ type: 'EDIT_TODO', payload }); 
  };
};

export function getRandomTodo() {
  return dispatch => {
    dispatch({ type: 'ADD_RANDOM_TODO_LOADING' });
    axios
    .get('https://cors-anywhere.herokuapp.com/http://www.boredapi.com/api/activity')
    .then(({ data }) => {
      alertify.notify('Added random todo', 'addTodo', 2.5);
      dispatch({ type: 'ADD_RANDOM_TODO_LOADING' });
      dispatch({ type: 'ADD_RANDOM_TODO', payload: { title: data.activity, status: false } });
    });
  };
};