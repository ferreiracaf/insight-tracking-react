import React, { Component } from 'react';
import axios from 'axios'


export default class AtualizarUsuario extends Component {

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
            cpf: '', nome: '', logradouro: '', numero: '',
            complemento: '', bairro: '', cep: '', cidade: '',
            estado: '', email: '', telefone: ''
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const {cpf, nome, logradouro, numero, complemento, bairro, cep, cidade, estado, email, telefone} = this.state
        const usuarioEditado = {
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
        axios.put('http://localhost:8080/usuarios/'+this.props.match.params.id, usuarioEditado)
            .then(
                (res) => { 
                    this.props.history.push('/usuarios/todos')
                 }
            )
            .catch(
                (error) => {
                    console.log(error)
                }
            )
        //this.setState(this.getEmptyState())
    }

    componentDidMount(){
        axios.get('http://localhost:8080/usuarios/'+this.props.match.params.id)
        .then(
            (res) =>{
                this.setState({
                    cpf: res.data.cpf, 
                    nome: res.data.nome,
                    logradouro: res.data.endereco.logradouro,
                    numero: res.data.endereco.numero,
                    complemento: res.data.endereco.complemento,
                    bairro: res.data.endereco.bairro,
                    cep: res.data.endereco.cep,
                    cidade: res.data.endereco.cidade,
                    estado: res.data.endereco.estado,
                    email: res.data.email,
                    telefone: res.data.telefone,
                })
            }
        )
        .catch(
            (error)=>{
                console.log(error)
            }
        )
    }



                // this.setState(res.data) // funciona
                // // nn funciona nenhum
                // this.setState(this.logradouro=res.data.endereco.logradouro) 
                // const {cpf, nome, email, telefone} = res.data
                // const {logradouro, numero, complemento, bairro, cep, cidade, estado} = res.data.endereco
                // this.setField('cpf', cpf)
                // this.setField('nome', nome)
                // this.setField('email', email)
                // this.setField('telefone', telefone)
                // this.setField('logradouro', logradouro)
                // this.setField('numero', numero)
                // this.setField('complemento', complemento)
                // this.setField('bairro', bairro)
                // this.setField('cep', cep)
                // this.setField('cidade', cidade)
                // this.setField('estado', estado)

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Editar Usuario</h3>
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
                        <input type="submit" value="Editar" className="btn btn-primary" />
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