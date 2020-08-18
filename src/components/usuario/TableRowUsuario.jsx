import React from 'react'
import { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class TableRowUsuario extends Component {

    constructor(props){
        super(props)
        this.apagar = this.apagar.bind(this)
    }

    apagar(){
        axios.delete('https://insight-tracking-postgres-api.herokuapp.com/usuarios/'+this.props.usuario.cpf)
        .then(
            (res) =>{
                console.log('Registro Apagado')
                this.props.apagarElementoPorId(this.props.usuario.cpf)
            }
        )
        .catch(
            (error) =>{
                console.log(error)
            }
        )
    }

    render() {

        return (
            <tr>
                <td>
                    <Link to={"/usuarios/"+this.props.usuario.cpf}>
                        {this.props.usuario.cpf}
                    </Link>
                </td>
                <td>
                    {this.props.usuario.nome}
                </td>
                <td style={{ textAlign: "end" }} >
                    <Link to={"/usuarios/atualizar/"+this.props.usuario.cpf} className="btn btn-primary" >Atualizar</Link >
                </td>
                <td style={{ textAlign: "initial" }}>
                    <button onClick={this.apagar} className="btn btn-danger" >Apagar</button>
                </td>
            </tr>
        )
    }
}