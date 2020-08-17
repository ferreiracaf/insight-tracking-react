import React, { Component } from 'react';
import Axios from 'axios';
import TableRow from './TableRowCategoria'
import { Link } from 'react-router-dom'
import '../layout/Page.css'


export default class ListarCategorias extends Component {
    constructor(props) {
        super(props)
        this.state = { categorias: [] }
        this.apagarElementoPorId = this.apagarElementoPorId.bind(this)
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/categorias')
            .then(
                (res) => {
                    this.setState({ categorias: res.data })
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    montarTabela() {
        if (!this.state.categorias) {
            return
        } else {
            return this.state.categorias.map((categoria, i) => {
                return <TableRow categoria={categoria} key={i} apagarElementoPorId={this.apagarElementoPorId} />
            }
            )
        }
    }

    apagarElementoPorId(id){
        let categoriasTemp = this.state.categorias
        for(let i = 0; i < categoriasTemp.length; i++){
            if(categoriasTemp[i].id === id){
                categoriasTemp.splice(i,1)
            }
        }
        this.setState({categorias: categoriasTemp})
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <div className="MeuTitulo">
                    <h2>Categorias</h2>
                    <Link to={"/categorias/criar"} className="btn btn-primary" >Adicionar</Link>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>ID </th>
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