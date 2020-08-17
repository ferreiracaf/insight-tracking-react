import React, { Component } from 'react';
import Axios from 'axios';
import TableRowAtividade from './TableRowAtividade'
import { Link } from 'react-router-dom'
import '../layout/Page.css'


export default class ListarAtividades extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            atividades: [],
            pesquisa: ''
        }
        this.apagarElementoPorId = this.apagarElementoPorId.bind(this)
    }

    setField = (fieldName, modifier) => e => {
        const value = modifier ? modifier(e.target.value) : e.target.value
        return this.setState({ [fieldName]: value })
    }


    // pesquisaFunction(){
    //     Axios.get('http://localhost:8080/atividades/?nome='+this.state.pesquisa)
    //         .then(
    //             (res) => {
    //                 this.setState({ atividades: res.data.content })
    //                 this.props.history.put('/atividades/todas')
    //             }
    //         )
    //         .catch(
    //             (error) => {
    //                 console.log(error)
    //             }
    //         )
    // }

    componentDidMount() {
        Axios.get('http://localhost:8080/atividades/')
            .then(
                (res) => {
                    this.setState({ atividades: res.data.content })
                }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
    }

    montarTabela() {
        if (!this.state.atividades) {
            return
        } else {
            return this.state.atividades.map((atividade, i) => {
                return <TableRowAtividade atividade={atividade} key={i} apagarElementoPorId={this.apagarElementoPorId} />
            }
            )
        }
    }

    apagarElementoPorId(id){
        let atividadesTemp = this.state.atividades
        for(let i = 0; i < atividadesTemp.length; i++){
            if(atividadesTemp[i].id === id){
                atividadesTemp.splice(i,1)
            }
        }
        this.setState({atividades: atividadesTemp})
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <div className="MeuTitulo">
                    <h2>Atividades: {this.pesquisa}</h2>
                    <div className="mButtons">
                        <input type="text" placeholder="Não foi implementado no front :(" readOnly style={{width:"240px", marginRight:"10px"}}></input>
                        <button className="btn btn-secondary" >Pesquisar</button>
                    </div>
                </div>
                <div className="myAdd">
                    <Link to={"/atividades/criar"}><button className="btn btn-primary">Adicionar</button></Link>
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