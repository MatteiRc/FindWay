import React, { Component } from 'react'
import {ConsumidorServico, ProvedorServico} from '../contexto.js';
import {Link} from 'react-router-dom';
import {ButtonFavorito, ButtonFavoritoVoltar} from './Button.js';
import '../App.css'
import { servicos, detalheServico} from '../data.js';
export default class Detalhes extends Component {
    render() {
        return (
            <ConsumidorServico>
                {valor=>{
                    const {id, company, img, info, price, title, inCart} = valor.detalheServico;
                    return (
                        <div className="container py-5">
                            <div className="row">
                                <div className="text-title-trabalho col-10 mx-auto text-center text-slanted my-5">
                                    <h1>{title}</h1>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-10 mx-auto col-md-6 my-3 ">
                                    <img id="imag" src={img} className="img-fluid" alt="servico"/>
                                </div>
                                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                    <h4 className="text-autor text-uppercase mt-3 mb-2">
                                        feito por: <span className="text-uppercase">
                                        {company}    
                                        </span>
                                    </h4>
                                    <h4>
                                        <p id="preco">Preço: R${price} 
                                            &emsp;&emsp;
                                            <ButtonFavorito 
                                                favorito
                                                disabled={inCart?true:false}
                                                onClick={()=>{
                                                    valor.addToFavoritos(id);
                                                }}
                                            >
                                                {inCart?<i id="favoritado" className="fas fa-star"></i>:<i className="fas fa-star"></i>}
                                            </ButtonFavorito>
                                        </p>
                                    </h4>
                                    <h4 id="informacao">DESCRIÇÃO SOBRE O SERVIÇO</h4>
                                    <p className="text-muted lead">{info}</p>
                                    <div>
                                        <Link to='/favoritos'>
                                            <ButtonFavoritoVoltar>
                                                <span className="mr-2"> 
                                                    <i className="fas fa-star" />
                                                </span>
                                                Voltar para Favoritos
                                            </ButtonFavoritoVoltar>
                                        </Link>
                                    </div>   
                                </div>
                            </div>
                        </div>
                    );
                }}
            </ConsumidorServico>
        );
    }
}