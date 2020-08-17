import React, { Component } from 'react';
import Axios from 'axios'

export default class CriarUsuario extends Component {

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
            id_categoria: '', nome_categoria: '', cpf_usuario: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const {nome, descricao, observacao, id_categoria, cpf_usuario} = this.state
        const usuarioPromise = Axios.get('http://localhost:8080/usuarios/'+cpf_usuario)
        const categoriaPromise = Axios.get('http://localhost:8080/categorias/'+id_categoria)

        
        Promise.all([usuarioPromise, categoriaPromise])
            .then(([{data: usuario}, {data: categoria}]) =>{
                const novaAtividade = {
                    nome, 
                    descricao, 
                    observacao,
                    categoria,
                    usuario
                }
                return Axios.post('http://localhost:8080/atividades', novaAtividade)
            })
        .then(
            (res) =>{
                this.props.history.push('/atividades/todas')
                console.log('Usuario adicionado com sucesso.')
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
        // this.setState(this.getEmptyState())
    }

    quandoAlterarFilho(ret) {
        console.log(ret)
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h2>Adicionar Atividade</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" required className="form-control" value={this.state.nome} onChange={this.setField('nome')} />
                    </div>
                    <div className="form-group">
                        <label>Descrição: </label>
                        <input type="text" className="form-control" value={this.state.descricao} onChange={this.setField('descricao')} />
                    </div>
                    <div className="form-group">
                        <label>Observação: </label>
                        <input type="text" className="form-control" value={this.state.observacao} onChange={this.setField('observacao')} />
                    </div>
                    <div className="form-group">
                        <label>ID da Categoria: </label>
                        <input type="text" required className="form-control" value={this.state.id_categoria} onChange={this.setField("id_categoria")} />
                    </div>
                    <div className="form-group">
                        <label>CPF do Usuario: </label>
                        <input type="text" className="form-control" value={this.state.cpf_usuario} onChange={this.setField('cpf_usuario', _formatCpf)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Adicionar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

function _formatCpf(value) {
    const cleanValue = value.replace(/\D/g, '').substring(0, 11)
  
    let finalValue = cleanValue.substring(0, 3)
    const part2 = cleanValue.substring(3, 6)
    if (part2) {
      finalValue += '.' + part2
      const part3 = cleanValue.substring(6, 9)
      if (part3) {
        finalValue += '.' + part3
        const part4 = cleanValue.substring(9, 11)
        if (part4) {
          finalValue += '-' + part4
        }
      }
    }
    return finalValue
}

function formCampo({label, value, onChange, type, required}){
    return (
        <div className="form-group">
            <label>{label}: </label>
            <input type={type} required={required} className="form-control" value={value} onChange={onChange} />
        </div>
    )
}