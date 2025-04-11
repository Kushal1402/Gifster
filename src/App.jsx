import { RouterProvider } from "react-router-dom";

// Project imports
import './App.css';
import Router from './routes';

function App() {

  return (
    <>
      <RouterProvider router={Router} />
    </>
  )
}

export default App
