import React from 'react'
import { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class TableRowAtividade extends Component {

    constructor(props){
        super(props)
        this.apagar = this.apagar.bind(this)
    }

    apagar(){
        axios.delete('http://localhost:8080/atividades/'+this.props.atividade.id)
        .then(
            (res) =>{
                console.log('Registro Apagado')
                this.props.apagarElementoPorId(this.props.atividade.id)
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
                    <Link to={"/atividades/"+this.props.atividade.id}>
                        {this.props.atividade.id}
                    </Link>
                </td>
                <td>
                    {this.props.atividade.nome}
                </td>
                <td style={{ textAlign: "end" }} >
                    <Link to={"/atividades/atualizar/"+this.props.atividade.id} className="btn btn-primary" >Atualizar</Link >
                </td>
                <td style={{ textAlign: "initial" }}>
                    <button onClick={this.apagar} className="btn btn-danger" >Apagar</button>
                </td>
            </tr>
        )
    }
}