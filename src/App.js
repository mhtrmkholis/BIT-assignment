import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Form from './components/form';
import TodoList from './components/list';
import './styles.css';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, doneTodo, editTodo, getRandomTodo } from './store/action';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  todos: state.todos,
});

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  doneTodo,
  editTodo,
  getRandomTodo
}; 

const App = ({ todos, isLoading, addTodo, deleteTodo, doneTodo, editTodo, getRandomTodo }) => {
  const [filterByStatus, setFilterByStatus] = useState('all');

  return (
    <div className="App">
      <h1 style={{marginTop: '40px', fontSize: '46px'}}>
        My Todos
      </h1>
      
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className='main-container'>
          <h4 style={{color: '#fff', marginBottom: '5px'}}><b>Add a todo to get started</b></h4>
          <div style={{color: '#fff'}}>•  •  •</div>
          <Form 
            saveTodo={todoText => {      
              if (todoText.trim().length > 0) addTodo({ title: todoText.trim(), status: false });
            }}
          />
          
          <div style={{marginTop: '20px', height: '50px', display: 'flex', justifyContent: 'center'}}>
            {
              isLoading ?
              <CircularProgress /> :
              <div className='random-btn' onClick={() => getRandomTodo()}><b>Random Todo</b></div>
              
            }
          </div>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', marginTop: '35px'}}>
        <h4 className='pagination-title' onClick={() => setFilterByStatus('all')}>All Todos</h4>
        <h4 style={{marginLeft: '15px', marginRight: '15px', padding: '5px'}}>•</h4>
        <h4 className='pagination-title' onClick={() => setFilterByStatus('unfinished')}>Unfinished</h4>
        <h4 style={{marginLeft: '15px', marginRight: '15px', padding: '5px'}}>•</h4>
        <h4 className='pagination-title' onClick={() => setFilterByStatus('finished')}>Finished</h4>
      </div>
      
      <div style={{margin: '400px', marginTop: '0px'}}>
        {
          filterByStatus === 'all' ? <TodoList todos={todos} deleteTodo={deleteTodo} doneTodo={doneTodo} editTodo={editTodo} type={''} /> :
          filterByStatus === 'unfinished' ? <TodoList todos={todos.filter(el => !el.status)} deleteTodo={deleteTodo} doneTodo={doneTodo} editTodo={editTodo} type={'unfinished'} /> :
          filterByStatus === 'finished' ? <TodoList todos={todos.filter(el => el.status)} deleteTodo={deleteTodo} editTodo={editTodo} type={'finished'} /> : false
        }
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
