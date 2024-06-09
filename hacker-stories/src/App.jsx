import * as React from 'react';
if(import.meta.hot) { import.meta.hot.dispose(() => { console.clear(); })}

const welcome = {
  title: "ReactObject",
  greeting: "Hello,",
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

const Item = ({item, onDelete}) => (
  <div style={{clear: "both"}}>
    <button style={{marginTop: "1.2em", float: "left"}} onClick={() => onDelete(item)}>Delete</button>
    <ul style={{float: "left"}}>
      <li>Title: <a href={item.url}>{item.title}</a></li>
      <li>Author: {item.author}</li>
      <li>Comments: {item.num_comments}</li>
      <li>Points: {item.points}</li>
    </ul>
  </div>
)

const List = ({name, list, onDelete}) => (
  <div>
    <h3>{name}:</h3>
    {list.map(item =>
      <Item key={item.objectID} item={item} onDelete={onDelete}/>
    )}
  </div>
)

const InputWithLabel = ({id, value, type="text", onInputChange, children }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
)
const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = useLocalStorage("search", "");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const initStories = [
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
  const getAsyncStories = () => 
    new Promise((resolve) => 
      setTimeout(
        () => resolve({data: { stories: initStories}}),
        2000
      )
    );
    
  const [stories, setStories] = React.useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then(result => {
      setStories(result.data.stories);
      setIsLoading(false);
    })
  }, [])


  const handleDelete = (story) => {
    setStories(stories.filter((s) => s.objectID != story.objectID));
  };

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
      <InputWithLabel id="search"
        value={searchTerm} onInputChange={handleSearch}>
          <strong>Search</strong>:
      </InputWithLabel>
      {isLoading ? (
        <p>Loading...</p>
      ):(
        <List name="Stock list" list={storiesSearched} onDelete={handleDelete}/>
      )}
      {/* <List name="My List" listParam={storiesMine}/> */}
    </div>
  );
}

export default App;
