import React, { Component } from 'react';
import Axios from 'axios'


export default class MostrarAtividade extends Component {

    constructor(props) {
        super(props)
        this.state = this.getEmptyState()
        this.onSubmit = this.onSubmit.bind(this)
    }

    setField = (fieldName, modifier) => e => {
        const value = modifier ? modifier(e.target.value) : e.target.value
        return this.setState({ [fieldName]: value })
    }

    getEmptyState(){
        return {
            id: '', nome: '', descricao: '', observacao: '',
            id_categoria: '', cpf_usuario: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const {id, nome, descricao, observacao, id_categoria, cpf_usuario} = this.state
        const usuarioPromise = Axios.get('https://insight-tracking-postgres-api.herokuapp.com/usuarios/'+cpf_usuario)
        const categoriaPromise = Axios.get('https://insight-tracking-postgres-api.herokuapp.com/categorias/'+id_categoria)
        
        Promise.all([usuarioPromise, categoriaPromise])
            .then(([{data: usuario}, {data: categoria}]) =>{
                const atividadeAtualizada = {
                    nome, 
                    descricao, 
                    observacao,
                    categoria,
                    usuario
                }
                return Axios.put('https://insight-tracking-postgres-api.herokuapp.com/atividades/'+id, atividadeAtualizada)
            })
        .then(
            (res) =>{
                this.props.history.push('/atividades/todas')
                console.log('Atividade aualizada com sucesso.')
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
    }

    componentDidMount(){
        Axios.get('https://insight-tracking-postgres-api.herokuapp.com/atividades/'+this.props.match.params.id)
        .then(
            (res) =>{
                this.setState({
                    id: res.data.id, 
                    nome: res.data.nome, 
                    descricao: res.data.descricao, 
                    observacao: res.data.observacao,
                    id_categoria: res.data.categoria.id, 
                    cpf_usuario: res.data.cpf_usuario
                })
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
                <h3>Atividade</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Nome: </label>
                        <input readOnly type="text" required className="form-control" value={this.state.nome} onChange={this.setField('nome')} />
                    </div>
                    <div className="form-group">
                        <label>Descrição: </label>
                        <input readOnly type="text" className="form-control" value={this.state.descricao} onChange={this.setField('descricao')} />
                    </div>
                    <div className="form-group">
                        <label>Observação: </label>
                        <input readOnly type="text" className="form-control" value={this.state.observacao} onChange={this.setField('observacao')} />
                    </div>
                    <div className="form-group">
                        <label>ID da Categoria: </label>
                        <input readOnly type="text" required className="form-control" value={this.state.id_categoria} onChange={this.setField("id_categoria")} />
                    </div>
                    <div className="form-group">
                        <label>CPF do Usuario: </label>
                        <input readOnly type="text" className="form-control" value={this.state.cpf_usuario} onChange={this.setField('cpf_usuario')} />
                    </div>
                    <div className="form-group">
                        <input readOnly type="submit" value="Atualizar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
