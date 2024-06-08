import * as React from 'react'
import html2canvas from "html2canvas";
import './App.css'
if(import.meta.hot) { import.meta.hot.dispose(()=>{console.clear();})}

function App() {
  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    /* note that the random div we're saving DOES have "color" property
    propagated down, but its background is transparent.  html2canvas
    makes background WHITE by default, so this will end up as white-on-white.
    
    Rather than assume a background color here, safest to make it
    actually transparent, so image editors later can slap on whatever
    background they like */
    // const canvas = await html2canvas(element);
    const canvas = await html2canvas(element, {backgroundColor: null});
    const data = canvas.toDataURL("image/jpg");
    
    const link = document.createElement("a");
    if(typeof link.download === "string") {
      link.href = data;
      link.download = "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  return (
    <div>
      <button onClick={handleDownloadImage}>
        Download as Image
      </button>
      <div>This won't be in the image.</div>
      <div ref={printRef}>This WILL be in the image.</div>
    </div>
  )
}

export default App
