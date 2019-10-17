const initialState = {
  isLoading: false,
  error: [],
  todos: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    case 'DELETE_TODO': {
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload)
      }
    }
    case 'SET_DONE_TODO': {
      return {
        ...state,
        todos: state.todos.map((el, i) => {
          if (i === action.payload) el.status = !el.status
          return el;
        })
      }
    }
    case 'EDIT_TODO': {
      return {
        ...state,
        todos: state.todos.map((el, i) => {
          if (i === action.payload.index) {
            el.title = action.payload.title 
            el.status = action.payload.status
          }
          return el;
        })
      }
    }
    case 'ADD_RANDOM_TODO_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading
      }
    case 'ADD_RANDOM_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      }
    default:
      return state
  }
};