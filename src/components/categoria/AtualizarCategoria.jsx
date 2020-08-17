import React, { Component } from 'react';
import axios from 'axios'


export default class AtualizarCategoria extends Component {

    constructor(props) {
        super(props)
        this.state = { nome: '' }
        this.state = { id: '' }

        this.setNome = this.setNome.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    setNome(e) {
        this.setState({ nome: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const categoriaEditada = {
            nome: this.state.nome,
        }
        axios.put('http://localhost:8080/categorias/'+this.props.match.params.id, categoriaEditada)
            .then(
                (res) => { 
                    this.props.history.push('/categorias/todas')
                 }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
        this.setState({ nome: '' })
    }

    componentDidMount(){
        axios.get('http://localhost:8080/categorias/'+this.props.match.params.id)
        .then(
            (res) =>{
                this.setState(
                    {
                        nome:res.data.nome,
                    }
                )
            }
        )
        .catch(
            (error)=>{
                console.log(error)
            }
        )
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Editar disciplina</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" className="form-control" value={this.state.nome} onChange={this.setNome} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Editar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}