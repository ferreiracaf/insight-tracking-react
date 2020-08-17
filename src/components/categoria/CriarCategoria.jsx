import React, { Component } from 'react';
import Axios from 'axios'

export default class CriarCategoria extends Component {

    constructor(props) {
        super(props)
        this.state = { nome: '' }
        this.setNome = this.setNome.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    setNome(e) {
        this.setState({ nome: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const novaCategoria = {
            nome: this.state.nome,
        }
        Axios.post('http://localhost:8080/categorias', novaCategoria)
        .then(
            (res) =>{
                this.props.history.push('/categorias/todas')
                console.log('Categoria adicionada com sucesso.')
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
        this.setState({ nome: '' })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h2>Adicionar Categoria</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" className="form-control" value={this.state.nome} onChange={this.setNome} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Adicionar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}