const welcome = {
  title: "ReactObject",
  greeting: "Hello,",
}
if(import.meta.hot) {
  import.meta.hot.dispose(() => {
    console.clear();
  })
}

const listStock = [
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

const listMine = [
  {
    title: "Another book",
    url: "https://www.example.com",
    author: "ME",
    num_comments: 0,
    points: 0,
    objectID: 2,
  },
]

const List = ({name, listParam}) => (
  <div>
  <h3>{name}:</h3>
  {listParam.map(item =>
      <div>
        <div key={item.objectID}>
        <ul>
          <li>Title: <a href={item.url}>{item.title}</a></li>
          <li>Author: {item.author}</li>
          <li>Comments: {item.num_comments}</li>
          <li>Points: {item.points}</li>
        </ul>
      </div>
    </div>
  )}
  </div>
)


const Search = () => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
  </div>
)

const App = () => (
  <div>
    <h1>{welcome.greeting} {welcome.title}!</h1>
    <Search />
    <List name="Stock list" listParam={listStock}/>
    <List name="My List" listParam={listMine}/>
  </div>
)

export default App;
