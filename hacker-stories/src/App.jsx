const welcome = {
  title: "ReactObject",
  greeting: "Hello,",
}
const people = ["Alice", "Bob", "Charlie"];

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function List() {
  return (
    <div>
    {list.map(item =>
      <div key={item.objectID}>
        <ul>
          <li>Title: <a href={item.url}>{item.title}</a></li>
          <li>Author: {item.author}</li>
          <li>Comments: {item.num_comments}</li>
          <li>Points: {item.points}</li>
        </ul>
      </div>
    )}
    </div>
  )
}

function Search() {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}!</h1>
      <Search />
      <List />
    </div>
  )
}
export default App;
