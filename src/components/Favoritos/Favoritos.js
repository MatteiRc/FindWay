import React, { Component } from 'react'
import TituloFav from '../TituloFav';
import FavoritoCol from './FavoritoCol';
import FavoritoVazio from './FavoritoVazio';
import {ConsumidorServico} from '../../contexto.js';
import FavoritoLista from './FavoritoLista.js';
export default class Favoritos extends Component {
    render() {
        return (
            <section>
                <ConsumidorServico>
                    {valor =>{
                        const { favorito } = valor;
                        if(favorito.length>0){
                            return (
                                <React.Fragment>
                                    <TituloFav nome="Serviços" titulo="Favoritos" />
                                    <FavoritoCol />
                                    <FavoritoLista value={ valor }/>
                                </React.Fragment>
                            );
                        } else {
                            return <FavoritoVazio />;
                        }
                    }}
                </ConsumidorServico>
            </section>
        );
    }
}
