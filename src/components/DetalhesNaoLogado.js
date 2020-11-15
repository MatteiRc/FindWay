import React, { Component } from 'react'
import {ConsumidorServico, ProvedorServico} from '../contexto.js';
import {Link} from 'react-router-dom';
import {ButtonServicos, ButtonFavorito} from './Button.js';
import '../App.css'
import { servicos, detalheServico} from '../data.js';
import NavbarServ from './NavBarServ.js';
export default class Detalhes extends Component {
    render() {
        return (
            <ConsumidorServico>
                {valor=>{
                    const {id, nome, img, info, preco, titulo, cidade, horario,classificacao} = valor.detalheServico;
                    return (
                        <React.Fragment>
                        <NavbarServ/>
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
                                    
                                    <h4 id="informacao">Descrição: </h4>
                                    <p className="text-muted lead">{info}</p>
                                    <h4 id="horario">Requisitos: </h4>
                                    <p className="text-muted lead">{horario}</p>   
                                    <div>
                                        <Link to='/'>
                                            <ButtonServicos>
                                                <span className="mr-2"> 
                                                    <i className="fas fa-arrow-left"></i>
                                                </span>
                                                Voltar
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
