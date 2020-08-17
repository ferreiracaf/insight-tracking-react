import React, { Component } from 'react';
import Axios from 'axios'

export default class CriarUsuario extends Component {

    constructor(props) {
        super(props)
        this.state = this.getEmptyState()

        /*
        this.setCpf = this.getFieldSetter("cpf").bind(this)
        this.setNome = this.getFieldSetter("nome").bind(this)
        this.setLogradouro = this.getFieldSetter("logradouro").bind(this)
        this.setNumero = this.getFieldSetter("numero").bind(this)
        this.setComplemento = this.getFieldSetter("complemento").bind(this)
        this.setBairro = this.getFieldSetter("bairro").bind(this)
        this.setCep = this.getFieldSetter("cep").bind(this)
        this.setCidade = this.getFieldSetter("cidade").bind(this)
        this.setEstado = this.getFieldSetter("estado").bind(this)
        this.setEmail = this.getFieldSetter("email").bind(this)
        this.setTelefone = this.getFieldSetter("telefone").bind(this)
        */

        this.onSubmit = this.onSubmit.bind(this)
    }

    /*getFieldSetter(fieldName) {
        return e => this.setState({ [fieldName]: e.target.value})
    }*/

    // setField = fieldName => e => this.setState({ [fieldName]: e.target.value })

    setField = (fieldName, modifier) => e => {
        const value = modifier ? modifier(e.target.value) : e.target.value
        return this.setState({ [fieldName]: value })
    }

    getEmptyState(){
        return {
            cpf: '', nome: '', logradouro: '', numero: '',
            complemento: '', bairro: '', cep: '', cidade: '',
            estado: '', email: '', telefone: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const {cpf, nome, logradouro, numero, complemento, bairro, cep, cidade, estado, email, telefone} = this.state

        const novoUsuario = {
            cpf,
            nome,
            endereco: {
                logradouro,
                numero,
                complemento,
                bairro,
                cep,
                cidade,
                estado
            },
            email,
            telefone
        }
        Axios.post('http://localhost:8080/usuarios', novoUsuario)
        .then(
            (res) =>{
                this.props.history.push('/usuarios/todos')
                console.log('Usuario adicionado com sucesso.')
            }
        )
        .catch(
            (error) => {
                console.log(error)
            }
        )
        this.setState(this.getEmptyState())
    }

    quandoAlterarFilho(ret) {
        console.log(ret)
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h2>Adicionar Usuario</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>CPF: </label>
                        <input type="text" className="form-control" value={this.state.cpf} onChange={this.setField('cpf', _formatCpf)} />
                    </div>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input type="text" className="form-control" value={this.state.nome} onChange={this.setField('nome')} />
                    </div>
                    <div className="form-group">
                        <label>Logradouro: </label>
                        <input type="text" className="form-control" value={this.state.logradouro} onChange={this.setField('logradouro')} />
                    </div>
                    <div className="form-group">
                        <label>Numero: </label>
                        <input type="number" className="form-control" value={this.state.numero} onChange={this.setField('numero')} />
                    </div>
                    <div className="form-group">
                        <label>Complemento: </label>
                        <input type="text" className="form-control" value={this.state.complemento} onChange={this.setField("complemento")} />
                    </div>
                    <div className="form-group">
                        <label>Bairro: </label>
                        <input type="text" className="form-control" value={this.state.bairro} onChange={this.setField("bairro")} />
                    </div>
                    <div className="form-group">
                        <label>Cep: </label>
                        <input type="text" className="form-control" value={this.state.cep} onChange={this.setField("cep", formatZipCode)} />
                    </div>
                    <div className="form-group">
                        <label>Cidade: </label>
                        <input type="text" className="form-control" value={this.state.cidade} onChange={this.setField("cidade")} />
                    </div>
                    <div className="form-group">
                        <label>Estado: </label>
                        <input type="text" className="form-control" value={this.state.estado} onChange={this.setField("estado")} />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" required className="form-control" value={this.state.email} onChange={this.setField("email")} />
                    </div>
                    <div className="form-group">
                        <label>Telefone: </label>
                        <input type="text" className="form-control" value={this.state.telefone} onChange={this.setField("telefone", _formatPhone)} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Adicionar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

function _formatPhone(value) {
    const cleanValue = value.replace(/\D/g, '').substring(0, 11)
    const nineDigits = cleanValue.length === 11
    let finalValue = cleanValue.substring(0, 2)
  
    if (finalValue) {
      finalValue = '(' + finalValue
      const part3Begin = nineDigits ? 7 : 6
      let part2 = cleanValue.substring(2, part3Begin)
      if (part2) {
        if (nineDigits) {
          part2 = `${part2[0]} ${part2.substring(1, 6)}`
        }
        finalValue += ') ' + part2
        const part3 = cleanValue.substring(part3Begin, 11)
        if (part3) {
          finalValue += '-' + part3
        }
      }
    }
    return finalValue
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

function formatZipCode(value) {
    const cleanValue = value.replace(/\D/g, '').substring(0, 8)
    let finalValue = cleanValue.substring(0, 2)
    const part2 = cleanValue.substring(2, 5)
    if (part2) {
      finalValue += '.' + part2
      const part3 = cleanValue.substring(5)
      if (part3) {
        finalValue += '-' + part3
      }
    }
    return finalValue
}