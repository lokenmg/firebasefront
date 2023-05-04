import React, {Component} from 'react';
import './App.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PeliculaTutorial from "./components/add-pelicula.component";
import PeliculasList from "./components/peliculas-list.component";

class App extends Component {
  render() {
    return (
      <div>
<Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="#home">Loken.io</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/peliculas">Peliculas</Nav.Link>
        <Nav.Link href="/add">Publicaciones</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        <div className="container mt-3">
          <h2>Crear publicación</h2>
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
