import { lazy } from "react";

// Proejct imports
const GIFS = lazy(() => import('./components/Gifs'));

import './App.css';

function App() {

  return (
    <>
      <GIFS />      
    </>
  )
}

export default App
