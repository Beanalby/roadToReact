import * as React from 'react';
import axios from "axios";
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

const makeApiEndpoint = (query) => {
  return `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}`;
}
const storyActions = {
  fetchInit: "FETCH_INIT",
  fetchSuccess: "FETCH_SUCCESS",
  fetchFailure: "FETCH_FAILURE",
  removeStory: "REMOVE_STORY",
};
const storiesReducer = (state, action) => {
  switch(action.type) {
    case storyActions.fetchInit:
      return {
        ...state,
        isLoading: true,
        errorMsg: null,
      };
    case storyActions.fetchSuccess:
      return {
        ...state,
        isLoading: false,
        errorMsg: null,
        data: action.payload,
      };
    case storyActions.fetchFailure:
      return {
        ...state,
        isLoading: false,
        errorMsg: action.payload,
        data: []
      };
    case storyActions.removeStory:
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID != story.objectID
        ),
      };
    default:
      throw new Error(`Unexpected action.type ${action.type}`);
    // case storyActions.setStory:
    //   return action.payload;
    // case storyActions.removeStory:
    //   return state.filter((s) => s.objectID != action.payload.objectID);
  }
}

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit}>
  <InputWithLabel id="search"
    value={searchTerm} onInputChange={onSearchInput}>
      <strong>Search</strong>:
  </InputWithLabel>
  <button type="submit" disabled={!searchTerm}>
    Search
  </button>
  </form>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage("search", "");
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const [url, setUrl] = React.useState(makeApiEndpoint(searchTerm));
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUrl(makeApiEndpoint(searchTerm));
  }

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    {
      data: [],
      isLoading: false,
      errorMsg: null,
    }
  );
  const handleFetchStories = React.useCallback(async () => {
    if(!searchTerm)
      return;
    dispatchStories({type: storyActions.fetchInit});
    try {
      const result = await axios.get(url);
      dispatchStories({
        type: storyActions.fetchSuccess,
        payload: result.data.hits,
      });
    } catch(error) {
      dispatchStories({
        type: storyActions.fetchFailure,
        payload: error,
      });
    }
  }, [url])
  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (story) => {
    dispatchStories({
      type: storyActions.removeStory,
      payload: story,
    });
  };

  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}!</h1>
      <SearchForm searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr/>
      {stories.errorMsg && <p>Error fetching stories: {stories.errorMsg}</p>}
      {stories.isLoading ? (
        <p>Loading...</p>
      ):(
        !stories.errorMsg && <List name="Story list" list={stories.data} onDelete={handleRemoveStory}/>
      )}
    </div>
  );
}

export default App;
