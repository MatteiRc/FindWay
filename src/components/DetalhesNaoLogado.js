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
                                    <Link to='/login'>
                                            <ButtonServicos>
                                                <span className="mr-2"> 
                                                    <i class="fas fa-comments"></i>
                                                </span>
                                                Conversar
                                            </ButtonServicos>
                                    </Link>
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h4 className="text-autor text-uppercase mt-3 mb-2">
                                        feito por: <span className="text-uppercase">
                                        {nome}    
                                        </span>
                                    </h4>
                                    <h4>
                                        <p id="preco">Preço: R${preco} 
                                            &emsp;&emsp;
                                        </p>
                                        <p id="cidade">Cidade: {cidade} 
                                            &emsp;&emsp;
                                        </p>
                                        <p id="horario">Horarios: {horario}
                                            &emsp;&emsp;
                                        </p>
                                        <p id ="classificao">Classificação: {classificacao}
                                        &emsp;&emsp;
                                        </p>
                                    </h4>
                                    <h4 id="informacao">DESCRIÇÃO SOBRE O SERVIÇO</h4>
                                    <p className="text-muted lead">{info}</p>
                                    <div>
                                        <Link to='/'>
                                            <ButtonServicos>
                                                <span className="mr-2"> 
                                                    <i className="fas fa-arrow-left"></i>
                                                </span>
                                                Voltar para Serviços
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
