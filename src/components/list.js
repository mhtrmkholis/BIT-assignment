import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { CheckCircle, Edit } from '@material-ui/icons';
import { List, ListItem, ListItemText, IconButton, CircularProgress } from '@material-ui/core';

const TodoList = ({ todos, deleteTodo, doneTodo, editTodo, type }) => {
  const [isLoading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const [i, setI] = useState(0);

  function submitEdit(payload) {
    editTodo(payload);
    setEditMode(!editMode);
    setValue('');
  };

  return (
    <div>
      {
        isLoading ?
        (setTimeout(() => setLoading(!isLoading), 1500),
        <CircularProgress style={{marginTop: '50px'}} />) :
        <List>
          {
            !todos.length &&
            <p>You have no {type} todo!</p>
          }
          {todos.map((todo, index) => (
            <ListItem key={index.toString()} dense button >
              <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                {
                  editMode && index === i ?
                  <div>
                    <form
                    onSubmit={event => {
                      event.preventDefault();
                      submitEdit({ title: value, status: todos.status, index });
                    }}
                    >
                      <input
                        style={{backgroundColor: '#fff', borderRadius: '8px', width: '300px', height: '40px', fontSize: '14px', paddingLeft: '10px', marginLeft: '12px', margin: '0px'}}
                        onChange={e => setValue(e.target.value)}
                        value={value || todo.title}
                      />
                    </form>
                  </div> :
                  <ListItemText primary={todo.title} />
                }
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {
                    !todo.status &&
                    <IconButton aria-label="Done" onClick={() => doneTodo(index)} >
                      <CheckCircle />
                    </IconButton>
                  }

                  <IconButton aria-label="Edit"
                    onClick={() => (editMode && i !== index ? setI(index) : (setI(index), setEditMode(!editMode)))} >
                    <Edit />
                  </IconButton> 

                  <IconButton aria-label="Delete" onClick={() => deleteTodo(index)} >
                    <DeleteIcon />
                  </IconButton> 
                </div> 
              </div>     
            </ListItem>
          ))}
        </List>
      }
    </div>
  )
};

export default TodoList;
