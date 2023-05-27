import React, { Component } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import PeliculaTutorial from "./components/add-pelicula.component";
import PeliculasList from "./components/peliculas-list.component";
import { Login } from "./components/usersComponents/Login";
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Logout } from './components/usersComponents/Logout';
import { Register } from './components/usersComponents/Register';
import { Perfil } from './components/usersComponents/Perfil';

class App extends Component {


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/peliculas" className="navbar-brand">
            La Red Social
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/peliculas"} className="nav-link">
                publicaciones
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Crear publicacion
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={"/perfil"} className='nav-link'>
                Ver perfil
              </Link>
            </li>
            <li className='nav-item'>
              <AuthProvider>
                <Logout />
              </AuthProvider>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <AuthProvider>
            <Routes>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path="peliculas" element={
                <ProtectedRoute>
                  <PeliculasList />
                </ProtectedRoute>
              } />
              <Route path="add" element={
                <ProtectedRoute>
                  <PeliculaTutorial />
                </ProtectedRoute>
              } />
              <Route path="perfil" element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              } />
            </Routes>
          </AuthProvider>

        </div>
      </div>
    );
  }
}

export default App;
