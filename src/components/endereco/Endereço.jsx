import React, { Component } from 'react';
import Axios from 'axios'

export default class Endereco extends Component {

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
}