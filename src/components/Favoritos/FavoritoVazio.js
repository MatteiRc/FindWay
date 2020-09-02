import React from 'react'
import TituloFav from '../TituloFav'
export default function FavoritoVazio() {
    return (
        <div className = "container mt-5">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title">
                    <TituloFav nome="Você não tem nenhum serviço como" titulo="favorito"></TituloFav>
                </div>
            </div>
        </div>
    )
}
