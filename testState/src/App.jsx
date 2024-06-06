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
const App = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);
  const [task, setTask] = useState("");
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");

  const handleShowAll = () =>  {
    dispatchFilter({type: "SHOW_ALL"});
  };
  const  handleShowComplete = () => {
    dispatchFilter({type: "SHOW_COMPLETE"});
  };
  const handleShowIncomplete = () => {
    dispatchFilter({type: "SHOW_INCOMPLETE"});
  };
  const handleChangeInput = event => {
    setTask(event.target.value);
  };
  const handleChangeCheckbox = todo => {
    console.log(`changing ${todo.id}`)
    dispatchTodos({
      type: todo.complete ? "UNDO_TODO" : "DO_TODO",
      id: todo.id,
    });
  };
  const handleSubmit = event => {
    if(task) {
      dispatchTodos({type: "ADD_TODO", task, id: uuidv4()});
      // setTodos(todos.concat({id: uuidv4(), task, complete: false}));
    }
    setTask("");
    event.preventDefault();
  };
  
  const filteredTodos = todos.filter(todo =>
    filter === "ALL"
      || (filter === "COMPLETE" && todo.complete)
      || (filter === "INCOMPLETE" && !todo.complete)
  );
  
  return (
    <div>
      <div>
        <button onClick={handleShowAll}>Show All</button>
        <button onClick={handleShowComplete}>Show Complete</button>
        <button onClick={handleShowIncomplete}>Show Incomplete</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input id={`box-${todo.id}`} type="checkbox"
              checked={todo.complete}
              onChange={() => handleChangeCheckbox(todo)}
            />
            <label htmlFor={`box-${todo.id}`}>{todo.task} - {todo.complete ? "True" : "False"}</label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
      </form>
    </div>
  )
}
export default App
