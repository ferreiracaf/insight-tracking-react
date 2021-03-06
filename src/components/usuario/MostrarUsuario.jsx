import React, { Component } from 'react';
import axios from 'axios'


export default class MostrarUsuario extends Component {

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
        axios.put('https://insight-tracking-postgres-api.herokuapp.com/usuarios/'+this.props.match.params.id, usuarioEditado)
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
        
    }

    componentDidMount(){
        axios.get('https://insight-tracking-postgres-api.herokuapp.com/usuarios/'+this.props.match.params.id)
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

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Usuario</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>CPF: </label>
                        <input readOnly type="text" className="form-control" value={this.state.cpf} onChange={this.setField('cpf')} />
                    </div>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input readOnly type="text" className="form-control" value={this.state.nome} onChange={this.setField('nome')} />
                    </div>
                    <div className="form-group">
                        <label>Logradouro: </label>
                        <input readOnly type="text" className="form-control" value={this.state.logradouro} onChange={this.setField('logradouro')} />
                    </div>
                    <div className="form-group">
                        <label>Numero: </label>
                        <input readOnly type="text" className="form-control" value={this.state.numero} onChange={this.setField('numero')} />
                    </div>
                    <div className="form-group">
                        <label>Complemento: </label>
                        <input readOnly type="text" className="form-control" value={this.state.complemento} onChange={this.setField("complemento")} />
                    </div>
                    <div className="form-group">
                        <label>Bairro: </label>
                        <input readOnly type="text" className="form-control" value={this.state.bairro} onChange={this.setField("bairro")} />
                    </div>
                    <div className="form-group">
                        <label>Cep: </label>
                        <input readOnly type="text" className="form-control" value={this.state.cep} onChange={this.setField("cep")} />
                    </div>
                    <div className="form-group">
                        <label>Cidade: </label>
                        <input readOnly type="text" className="form-control" value={this.state.cidade} onChange={this.setField("cidade")} />
                    </div>
                    <div className="form-group">
                        <label>Estado: </label>
                        <input readOnly type="text" className="form-control" value={this.state.estado} onChange={this.setField("estado")} />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input readOnly type="email" required className="form-control" value={this.state.email} onChange={this.setField("email")} />
                    </div>
                    <div className="form-group">
                        <label>Telefone: </label>
                        <input readOnly type="text" className="form-control" value={this.state.telefone} onChange={this.setField("telefone")} />
                    </div>
                </form>
            </div>
        )
    }
}
