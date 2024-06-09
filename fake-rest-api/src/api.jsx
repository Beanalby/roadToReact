import { v4 as uuidv4 } from "uuid"
const apiDelay = 2000;
const idOne = uuidv4();
const idTwo = uuidv4();
const idThree = uuidv4();

let users = {
  [idOne]: {
    id: idOne,
    firstName: 'Jason',
    lastName: 'Viers',
    isDeveloper: true,
  },
  [idTwo]: {
    id: idTwo,
    firstName: 'Tina',
    lastName: 'Viers',
    isDeveloper: false,
  },
  [idThree]: {
    id: idThree,
    firstName: 'Kirby',
    lastName: 'Viers',
    isDeveloper: false,
  }
};

//#region getUsers
export const getUsers = () =>
  new Promise((resolve, reject) => {
    if(!users) {
      return setTimeout(
        () => reject(new Error("Users not found")),
        apiDelay);
    }
    setTimeout(() => resolve(Object.values(users)), apiDelay);
  });
// usage example
const doGetUsers = () => {
  getUsers()
    .then(result => {
      console.log("Delayed result:");
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
}
// doGetUsers();
//#endregion

//#region getUser
export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users[id];
    if(!user) {
      return setTimeout(
        () => reject(new Error("User not found")),
        apiDelay
      );
    }
    setTimeout(() => resolve(users[id]), apiDelay);
  });
};
// usage example
const doGetUser = async (id) => {
  try {
    console.log("+++ trying " + id);
    const result = await getUser(id);
    console.log(result);
  } catch(error) {
    console.log(error);
  }
};
// doGetUser("1");
// doGetUser(idTwo);
//#endregion

//#region createUser
export const createUser = (data) =>
  new Promise((resolve, reject) => {
    let missingFields = [];
    if(!data.firstName) {
        missingFields.push("firstName");
    }
    if(!data.lastName) {
        missingFields.push("lastName");
    }
    if (missingFields.length) {
      reject(new Error("Not all information provided: " + missingFields.join(", ")));
    }
    const id = uuidv4();
    const newUser = {id, ...data};
    users = {...users, [id]: newUser };
    setTimeout(() => resolve(true), apiDelay);
  });
// usage example
const doCreateUser = async (data) => {
  try {
    console.log(await createUser(data));
    console.log("Users after adding:");
    console.log(await getUsers());
  } catch (error) {
    console.log(error);
  }
}
// doCreateUser({firstName: "John", lastName: "Doe"});
//#endregion

//#region updateUser
export const updateUser = (id, data) =>
  new Promise((resolve, reject) => {
    if(!users[id]) {
      return setTimeout(
        () => reject(new Error("User not found")),
        apiDelay
      );
    }
    users[id] = {...users[id], ...data };
    return setTimeout(() => resolve(true), apiDelay)
  });
// usage example
const doUpdateUser = async (id, data) => {
  try {
    const result = await updateUser(id, data);
    console.log(result);
    console.log("Users after updating:");
    console.log(await getUsers());
  } catch(error) {
    console.log(result);
  }
}
// doUpdateUser(idOne, { isDeveloper: false});
//#endregion

//#region deleteUser
export const deleteUser = (id) =>
  new Promise((resolve, reject) => {
    const { [id]: user, ...rest } = users;
    if(!user) {
      return setTimeout(
        () => reject(new Error("User not found")),
        apiDelay);
    }
    users = { ...rest };
    return setTimeout(() => resolve(true), apiDelay);
  });
// usage example
const doDeleteUser = async (id) => {
  try {
    const response = await deleteUser(id);
    console.log(response);
    console.log("Users after deletion");
    console.log(await getUsers());
  } catch(error) {
    console.log(error);
  }
}
// doDeleteUser("notfound");
// doDeleteUser(idOne);
//#endregion
