import React, { Component } from 'react';
import logo from './img/Insight_Avatar.png'

export default class Home extends Component{
    render(){
        return(
            <div className="App">
                <h1>Bem vindo ao Insight Tracking!</h1>
                <div className="TEST">
                    <img className="App-logo" src={logo}></img>
                    <a>Esta aplicação web se objetiva representar um sistema de cadastro de currículos no 
                        qual podem-se cadastrar Usuários e Atividades por eles realizadas de acordo com 
                        suas categorias. </a>
                </div>
            </div>
        )
    }
}