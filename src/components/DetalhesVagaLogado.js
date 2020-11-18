import React, { Component } from 'react'
import {ConsumidorServico, ProvedorServico} from '../contexto.js';
import {Link} from 'react-router-dom';
import {ButtonServicos, ButtonFavorito} from './Button.js';
import '../App.css'
import { servicos, detalheServico} from '../data.js';
import NavBarLogado from './NavBarLogado.js';
import axios from "axios";

export default class Detalhes extends Component {

    state = {
        classificacao:0
    }

	handleSubmit(id, id_usuario) {
        axios.post('http://localhost:3001/postarCurriculo/'+id)
       .then(res =>{
        localStorage.setItem("id_usuario", res.data);
         window.location.href = "http://localhost:3000/usuariologado";
       })
	}


    render() {
        return (
            <ConsumidorServico>
                {valor=>{
                    const {id, nome, img, info, preco, titulo, cidade, horario,classificacao} = valor.detalheServico;
                    return (
                        <React.Fragment>
                        <NavBarLogado />
                        <div className="container py-5">
                            <div className="row">
                                <div className="text-title-trabalho col-10 mx-auto text-center text-slanted my-5">
                                    <h2>{titulo}</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 ">
                                    <img id="imag" src={img} className="img-fluid" alt="servico"/> 
                                    <br/>
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h4 id="informacao">Descrição:</h4>
                                    <p className="text-muted lead">{info}</p>
                                    <h4 id="horario">Requisitos: </h4>
                                    <p className="text-muted lead">{horario}</p>        
                                    <div>
                                        <Link to='/selecao'>
                                            <ButtonServicos>
                                                <span className="mr-2"> 
                                                    <i className="fas fa-arrow-right"></i>
                                                </span>
                                            Enviar Currículo
                                            </ButtonServicos>
                                        </Link>
                                    </div>   
                                </div>
                            </div>
                        </div>
                        </React.Fragment>
                    );
                }}
            </ConsumidorServico>
        );
    }
}
