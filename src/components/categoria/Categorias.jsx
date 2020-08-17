import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Categorias extends Component {

    render() {
        return (
            <div>
                <div>
                    <Link to={"/categorias/todas"} className="btn btn-primary">Listar todas as categorias</Link>
                </div>
                <div>
                    <Link to={"/categorias/busca"} className="btn btn-secondary">Buscar uma categoria pelo id</Link>
                </div>
                <div>
                    <Link to={"/categorias/criar"} className="btn btn-primary">Criar uma nova categoria</Link>
                </div>
            </div>
        )
    }
}