import React, { useState } from 'react';
import {v4 as uuidv4} from "uuid";

// import './App.css'

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

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [task, setTask] = useState("");

  const handleChangeInput = event => {
    setTask(event.target.value);
  };
  const handleChangeCheckbox = id => {
    console.log(`changing ${id}`)
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          console.log(`changing ${todo.complete} for ${todo.id}`);
          return {...todo, complete: !todo.complete };
        } else {
          console.log(`passing through ${todo.id}`);
          return todo;
        }
      })
    );
  };
  
  const handleSubmit = event => {
    if(task) {
      setTodos(todos.concat({id: uuidv4(), task, complete: false}));
    }
    setTask("");
    event.preventDefault();
  };
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox"
              checked={todo.complete}
              onChange={() => handleChangeCheckbox(todo.id)}
            />
            <label>{todo.task} - {todo.complete ? "True" : "False"}</label>
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
