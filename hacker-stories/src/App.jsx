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

const List = ({name, list}) => (
  <div>
    <h3>{name}:</h3>
    {list.map(item =>
      <Item key={item.objectID} item={item} />
    )}
  </div>
)

const Search = ({term, onSearch}) => {
  const handleChange = (event) => {
    onSearch(event.target.value);
  }
  return (
    <div>
      <p>
        Searching for <strong>{term}</strong>
      </p>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" value={term}
        onChange={handleChange} />
    </div>
  );
}

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const stories = [
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
  const storiesSearched = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // const storiesMine = [
  //   {
  //     title: "Another book",
  //     url: "https://www.example.com",
  //     author: "ME",
  //     num_comments: 0,
  //     points: 0,
  //     objectID: 2,
  //   },
  // ];

  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}!</h1>
      <Search term={searchTerm} onSearch={setSearchTerm}/>
      <List name="Stock list" list={storiesSearched}/>
      {/* <List name="My List" listParam={storiesMine}/> */}
    </div>
  )
}

export default App;
