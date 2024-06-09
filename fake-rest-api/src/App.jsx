import * as React from 'react'
import './App.css'
import { getUsers, createUser, updateUser, deleteUser } from "./api";

if(import.meta.hot) { import.meta.hot.dispose(() => console.clear())}

const getDeveloperText = (isDeveloper) =>
  `is ${isDeveloper ? "a" : "not a" } developer`;

function App() {
  const [users, setUsers] = React.useState(null);
  const doGetUsers = React.useCallback(async () => {
    try {
      const result = await getUsers();
      setUsers(result);
    } catch(error) {
      console.log(error);
    }
  },  []);
  React.useEffect(() => {
    doGetUsers();
  }, [doGetUsers]);
  const refetchUsers = async () => {
    await doGetUsers();
  }

  const [firstName, setFirstName]= React.useState("");  
  const [lastName, setLastName]= React.useState("");  
  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  }
  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  }
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      console.log("+++ creating user");
      await createUser({firstName, lastName, isDeveloper: false});
      console.log("+++ refetching users");
      await refetchUsers();
    } catch(error) {
      console.log(error);
    }
  }

  const handleEdit = async (id) => {
    const user = users.find((user) => user.id === id);
    const isDeveloper = !user.isDeveloper;
    try {
      console.log("+++ updating user");
      await updateUser(id, {isDeveloper});
      console.log("+++ refetching users");
      await refetchUsers();
    } catch(error) {
      console.log(error);
    }
  }
  const handleRemove = async (id) => {
    try {
      console.log(`+++ deleting user ${id}`);
      await deleteUser(id);
      console.log("+++ refetching users");
      await refetchUsers();
    } catch(error) {
      console.log(error);
    }
  }

  if(!users) {
    return null;
  }
  return (
    <div>
      <ul>
        {users.map((user) => {
          const isDeveloperText = getDeveloperText(user.isDeveloper);
          return (
            <li key={user.id}>
              <button onClick={() => handleEdit(user.id)}>
                  Toggle Developer (Update)
              </button>
              <button onClick={() => handleRemove(user.id)}>
                Remove User (Delete)
              </button>
              {user.firstName} {user.lastName} {isDeveloperText}
            </li>
          );
        })}
      </ul>

      <p>Create User:</p>
      <form onSubmit={handleCreate}>
        <label style={{display: "block"}}>
          First Name:
          <input type="input" onChange={handleChangeFirstName}/>
        </label>
        <label style={{display: "block"}}>
          Last Name:
          <input type="input" onChange={handleChangeLastName}/>
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default App
