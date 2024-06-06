import React, { useState, useReducer } from 'react';
import {v4 as uuidv4} from "uuid";

if (import.meta.hot) {
  import.meta.hot.dispose(() => { console.clear(); });
}

const initialTodos = [
  {
    id: uuidv4(),
    task: "Learn React",
    complete: true,
  },
  {
    id: uuidv4(),
    task: "Learn Firebase",
    complete: false,
  },
  {
    id: uuidv4(),
    task: "Learn GraphQL",
    complete: false,
  },
];

const filterReducer = (state, action) => {
  switch(action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETE":
      return "COMPLETE";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error(`Invalid type ${action.type}`);
  }
}

const Filter = ({ dispatch }) => {
  const handleShowAll = () =>  {
    dispatch({type: "SHOW_ALL"});
  };
  const  handleShowComplete = () => {
    dispatch({type: "SHOW_COMPLETE"});
  };
  const handleShowIncomplete = () => {
    dispatch({type: "SHOW_INCOMPLETE"});
  };
  return (
    <div>
      <button onClick={handleShowAll}>Show All</button>
      <button onClick={handleShowComplete}>Show Complete</button>
      <button onClick={handleShowIncomplete}>Show Incomplete</button>
    </div>
  )
}

const todoReducer = (state, action) => {
  switch(action.type) {
    case "DO_TODO":
      return state.map(todo => {
        if(todo.id === action.id) {
          return {...todo, complete: true };
        } else {
          return todo;
        }
      })
    case "UNDO_TODO":
      return state.map(todo => {
        if(todo.id === action.id) {
          return {...todo, complete: false };
        } else {
          return todo;
        }
      })
    case "ADD_TODO":
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false,
      });
    default:
      throw new Error(`Unexpected todoReducer action.type ${action.type}`);
  }
}

const TodoList = ({dispatch, todos}) => (
  <ul>
    {todos.map(todo => (
      <TodoItem key={todo.id} dispatch={dispatch} todo={todo} />
    ))}
  </ul>
)

const TodoItem = ({dispatch, todo}) => {
  const handleChange = todo => {
    console.log(`changing ${todo.id}`)
    dispatch({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id,
    });
  };
  return (
    <li key={todo.id}>
      <input id={`box-${todo.id}`} type="checkbox"
        checked={todo.complete}
        onChange={() => handleChange(todo)}
      />
      <label htmlFor={`box-${todo.id}`}>{todo.task} - {todo.complete ? "True" : "False"}</label>
    </li>
  )
}

const AddTodo = ({dispatch}) => {
  const [task, setTask] = useState("");

  const handleChangeInput = event => setTask(event.target.value);

  const handleSubmit = event => {
    if(task) {
      dispatch({type: "ADD_TODO", task, id: uuidv4()});
    }
    setTask("");
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task} onChange={handleChangeInput} />
    </form>
  )
}

const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  
  const filteredTodos = todos.filter(todo =>
    filter === "ALL"
      || (filter === "COMPLETE" && todo.complete)
      || (filter === "INCOMPLETE" && !todo.complete)
  );
  
  return (
    <div>
      <Filter dispatch={dispatchFilter} />
      <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
      <AddTodo dispatch={dispatchTodos} />
    </div>
  )
}
export default App
