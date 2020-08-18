import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom'
// import Home from './components/Home'
import ListarCategorias from './components/categoria/ListarCategorias';
import AtualizarCategoria from './components/categoria/AtualizarCategoria';
import CriarCategoria from './components/categoria/CriarCategoria';
import ListarUsuarios from './components/usuario/ListarUsuarios';
import MostrarUsuario from './components/usuario/MostrarUsuario';
import CriarUsuario from './components/usuario/CriarUsuario';
import AtualizarUsuario from './components/usuario/AtualizarUsuario';
import ListarAtividades from './components/atividade/ListarAtividades';
import CriarAtividade from './components/atividade/CriarAtividade';
import AtualizarAtividade from './components/atividade/AtualizarAtividade';
import MostrarAtividade from './components/atividade/MostrarAtividade';


export default class App extends Component {

  render() {
    return (
      <div className="container">
      <Router>
          <nav className="navbar navbar-expand-sm navbar-light-bg-light">
            <p className="navbar-brand">Insight Tracking</p>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/categorias/todas'} className="nav-link">Categorias</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/usuarios/todos'} className="nav-link">Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/atividades/todas'} className="nav-link">Atividades</Link>
                </li>
              </ul>
            </div>
          </nav>
        <div className="container" >
          <Switch>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/categorias/todas" component={ListarCategorias} />
            <Route exact path="/categorias/criar" component={CriarCategoria} />
            <Route exact path="/categorias/atualizar/:id" component={AtualizarCategoria} />
            <Route exact path="/usuarios/todos" component={ListarUsuarios} />
            <Route exact path="/usuarios/criar" component={CriarUsuario} />
            <Route exact path="/usuarios/atualizar/:id" component={AtualizarUsuario} />
            <Route exact path="/usuarios/:id" component={MostrarUsuario} />
            <Route exact path="/atividades/todas" component={ListarAtividades} />
            <Route exact path="/atividades/:id" component={MostrarAtividade} />
            <Route exact path="/atividades/criar" component={CriarAtividade} />
            <Route exact path="/atividades/atualizar/:id" component={AtualizarAtividade} />
            
            {/* not functional */}
            {/* <Route exact path="/categorias" component={Categorias} />
            <Route exact path="/categorias/buscar" component={Atividades} />
            <Route exact path="/usuarios" component={Usuarios} /> */}
          </Switch>
        </div>
      </Router>
      </div>
    )
  }
}
