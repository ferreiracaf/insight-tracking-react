import React from 'react'
import { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
export default class TableRow extends Component {

    constructor(props){
        super(props)
        this.apagar = this.apagar.bind(this)
    }

    apagar(){
        axios.delete('http://localhost:8080/categorias/'+this.props.categoria.id)
        .then(
            (res) =>{
                console.log('Registro Apagado')
                this.props.apagarElementoPorId(this.props.categoria.id)
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
                    {this.props.categoria.id}
                </td>
                <td>
                    {this.props.categoria.nome}
                </td>
                <td style={{ textAlign: "end" }}>
                    <Link to={"/categorias/atualizar/"+this.props.categoria.id} className="btn btn-primary" >Atualizar</Link >
                </td>
                <td style={{ textAlign: "initial" }}>
                    <button onClick={this.apagar} className="btn btn-danger" >Apagar</button>
                </td>
            </tr>
        )
    }
}