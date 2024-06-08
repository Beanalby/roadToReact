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

const useLocalStorage = (storageKey, fallbackState) => {
  const stored = localStorage.getItem(storageKey);
  const [value, setValue] = React.useState(
     stored ? JSON.parse(stored) : fallbackState
  );
  React.useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
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

const InputWithLabel = ({id, label, value, type="text", onInputChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
)
const App = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage("search", "");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
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
      <InputWithLabel id="search" label="Search"
        value={searchTerm} onInputChange={handleSearch} />
      <List name="Stock list" list={storiesSearched}/>
      {/* <List name="My List" listParam={storiesMine}/> */}
    </div>
  )
}

export default App;
