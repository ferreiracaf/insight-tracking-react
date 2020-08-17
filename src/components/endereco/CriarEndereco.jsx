import React, { Component, useState} from 'react';
import Axios from 'axios'

export default class CriarEndereco extends Component {

    constructor(props) {
        super(props)
        this.state = { logradouro: '' }
        this.state = { numero: '' }
        this.state = { complemento: '' }
        this.state = { bairro: '' }
        this.state = { cep: '' }
        this.state = { cidade: '' }
        this.state = { estado: '' }
        
        this.setLogradouro = this.setLogradouro.bind(this)
        this.setNumero = this.setNumero.bind(this)
        this.setComplemento = this.setComplemento.bind(this)
        this.setBairro = this.setBairro.bind(this)
        this.setCep = this.setCep.bind(this)
        this.setCidade = this.setCidade.bind(this)
        this.setEstado = this.setEstado.bind(this)

        this.onSubmit = this.onSubmit.bind(this)
    }

    setLogradouro(e) {
        this.setState({ logradouro: e.target.value })
    }
    setNumero(e) {
        this.setState({ numero: e.target.value })
    }
    setComplemento(e) {
        this.setState({ complemento: e.target.value })
    }
    setBairro(e) {
        this.setState({ bairro: e.target.value })
    }
    setCep(e) {
        this.setState({ cep: e.target.value })
    }
    setCidade(e) {
        this.setState({ cidade: e.target.value })
    }
    setEstado(e) {
        this.setState({ estado: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const novoEndereco = {
            logradouro: this.state.logradouro,
            numero: this.state.numero,
            complemento: this.state.complemento,
            bairro: this.state.bairro,
            cep: this.state.cep,
            cidade: this.state.cidade,
            estado: this.state.estado,
        }
        console.log(novoEndereco)
        
        this.setState({ 
            logradouro: '', numero: '', complemento: '', bairro: '',
             cep: '', cidade: '', estado: ''
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <form>
                    <div className="form-group">
                        <label>Logradouro: </label>
                        <input type="text" className="form-control" value={this.state.logradouro} onChange={this.props.onAlterar(this.state.logradouro)} />
                    </div>
                    <div className="form-group">
                        <label>Numero: </label>
                        <input type="text" className="form-control" value={this.state.numero} onChange={this.setNumero} />
                    </div>
                    <div className="form-group">
                        <label>Complemento: </label>
                        <input type="text" className="form-control" value={this.state.complemento} onChange={this.setComplemento} />
                    </div>
                    <div className="form-group">
                        <label>Bairro: </label>
                        <input type="text" className="form-control" value={this.state.bairro} onChange={this.setBairro} />
                    </div>
                    <div className="form-group">
                        <label>Cep: </label>
                        <input type="text" className="form-control" value={this.state.cep} onChange={this.setCep} />
                    </div>
                    <div className="form-group">
                        <label>Cidade: </label>
                        <input type="text" className="form-control" value={this.state.cidade} onChange={this.setCidade} />
                    </div>
                    <div className="form-group">
                        <label>Estado: </label>
                        <input type="text" className="form-control" value={this.state.estado} onChange={this.setEstado} />
                    </div>
                </form>
            </div>
        )
    }
}