import React, {Component} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link } from "react-router-dom";

import PeliculaTutorial from "./components/add-pelicula.component";
import PeliculasList from "./components/peliculas-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/peliculas" className="navbar-brand">
            bezKoder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/peliculas"} className="nav-link">
                Peliculas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>React Firestore CRUD</h2>
          <Routes>
            <Route path="peliculas" element={<PeliculasList/>} />
            <Route path="add" element={<PeliculaTutorial/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
