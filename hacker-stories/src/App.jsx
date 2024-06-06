import * as React from 'react';

const welcome = {
  title: "ReactObject",
  greeting: "Hello,",
}
if(import.meta.hot) {
  import.meta.hot.dispose(() => {
    console.clear();
  })
}

const Item = ({item}) => (
  <ul>
    <li>Title: <a href={item.url}>{item.title}</a></li>
    <li>Author: {item.author}</li>
    <li>Comments: {item.num_comments}</li>
    <li>Points: {item.points}</li>
  </ul>
)

const List = ({name, listParam}) => (
  <div>
    <h3>{name}:</h3>
    {listParam.map(item =>
      <Item key={item.objectID} item={item} />
    )}
  </div>
)

const Search = () => {
  const  [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    console.log("handling change");
    setSearchTerm(event.target.value)
  }
  const handleBlur = (event) => {
    console.log("handling blur");
    console.log(event)
  }
  return (
    <div>
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} onBlur={handleBlur}/>
    </div>
  );
}

const App = () => {
  const storiesStock = [
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
  
  const storiesMine = [
    {
      title: "Another book",
      url: "https://www.example.com",
      author: "ME",
      num_comments: 0,
      points: 0,
      objectID: 2,
    },
  ]
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}!</h1>
      <Search />
      <List name="Stock list" listParam={storiesStock}/>
      <List name="My List" listParam={storiesMine}/>
    </div>
  )
}

export default App;
