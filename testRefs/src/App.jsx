import * as React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

if(import.meta.hot) { import.meta.hot.dispose(() => { console.clear();})}
const roundBox = {background: "black", borderRadius: "10px", padding: "1em"};

const ComponentWithReadWriteRef = ({label, value, isFocus}) => {
  const [text, setText] = React.useState("Some text");
  const handleOnChange = (event) => {
    setText(event.target.value);
  }

  const ref = React.useCallback((node) => {
    if(!node) return;
    const {width} = node.getBoundingClientRect();
    document.title = `Width: ${width}`;
    node.style.color = (width > 150) ? "red" : "blue";
    }, [text]);
  // const ref = React.useRef();
  // React.useEffect(() => {
  //   const {width} = ref.current.getBoundingClientRect();
  //   console.log("Calculated width=" + width);
  //   document.title = `Width:${width}`;
  // }, [text]);

  return (
    <div style={roundBox}>
      <p>The page title will update with the width of the below span's text, and the color will change if it's too wide:</p>
      <input type="text" value={text} onChange={handleOnChange} />
      <p><span ref={ref}>{text}</span></p>
    </div>
  )
}

const NotFirstRender = () => {
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log("This WASN'T the first render.");
    }
  });
  return (<></>);  
}

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const onClick = () => {
    setCount(count + 1);
  }
  return (
    <div style={roundBox}>
      <p>{count}</p>
      <button onClick={onClick}>
        Increase
      </button>
      <NotFirstRender />
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <h1>useRefs!</h1>
      <div className="card">
        <Counter />
      </div>
      <ComponentWithReadWriteRef label="MyLabel" value="MyValue" isFocus={false} />
    </>
  )
}

export default App
