import React, { Component } from 'react';
import Axios from 'axios';
import TableRowUsuario from './TableRowUsuario'
import { Link } from 'react-router-dom'
import '../layout/Page.css'


export default class ListarUsuarios extends Component {
    constructor(props) {
        super(props)
        this.state = { usuarios: [] }
        this.apagarElementoPorId = this.apagarElementoPorId.bind(this)
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/usuarios')
            .then(
                (res) => {
                    this.setState({ usuarios: res.data })
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    montarTabela() {
        if (!this.state.usuarios) {
            return
        } else {
            return this.state.usuarios.map((usuario, i) => {
                return <TableRowUsuario usuario={usuario} key={i} apagarElementoPorId={this.apagarElementoPorId} />
            }
            )
        }
    }

    apagarElementoPorId(cpf){
        let usuariosTemp = this.state.usuarios
        for(let i = 0; i < usuariosTemp.length; i++){
            if(usuariosTemp[i].cpf === cpf){
                usuariosTemp.splice(i,1)
            }
        }
        this.setState({usuarios: usuariosTemp})
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <div className="MeuTitulo">
                    <h2>Usuarios</h2>
                    <Link to={"/usuarios/criar"} className="btn btn-primary" >Adicionar</Link>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>CPF </th>
                            <th>Nome </th>
                            <th colSpan="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.montarTabela()}
                    </tbody>
                </table>
            </div>
        )
    }
}