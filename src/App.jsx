import { RouterProvider } from "react-router-dom";

// Project imports
import './App.css';
import Router from './routes';
import GifProvider from "./context/gif-context";

function App() {

  return (
    <>
      <GifProvider>
        <RouterProvider router={Router} />
      </GifProvider>
    </>
  )
}

export default App
