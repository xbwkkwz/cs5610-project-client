// import logo from './logo.svg';
import './App.css';

import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";

import Website from "./website"


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/*" element={<Website/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
