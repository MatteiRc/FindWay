import React from 'react';
import {ButtonServicos} from '../Button.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ConsumidorServico} from '../../contexto.js'; 
export default function FavoritoItem({item, value}) {
    const {id, titulo, img, preco, info, favorito} = item;
    const {removeItem} = value;
    return (
        <FavoritoStyled className="col-9 mx-auto col-md-6 col-lg-3 my-3">
                <div className="card">
            <ConsumidorServico>
                    {valor => (
                        <div className="img-container p-3" onClick={()=> valor.handleDetalhe(id)}> 
                            <Link to="/detalhesLogado">
                                <img src={img} alt="product" className="card-img-top" />  
                            </Link>
                            <Link to='/chat'>
                                <ButtonServicos className="card-btn">
                                    <span className="mr-2">
                                      <i class="fas fa-comments"></i>
                                    </span>
                                      Conversar
                               </ButtonServicos>
                            </Link>
                        </div>
                    )}
            </ConsumidorServico>
            <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">
            {titulo}
            </p>
            <h5 className="font-italic mb-0">
                <span className="mr-1">R$</span>
                {preco}
            </h5>
            </div>
            </div>    
                  
        </FavoritoStyled>
    )
}
const FavoritoStyled = styled.div`
.card{
    border-color: transparent;
    transition: all 0s linear;
}
.card-footer{
    background:var(--mainColor);
    border-top:transparent;
    transition: all 0s linear;
}
&:hover{
    .card{
        border:0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
    }
    .card-footer{
        background: var(--mainColor);
    }
}
.img-container{
    position: relative;
    overflow: hidden;
}
.card-img-top{
    transition: all 0.5s linear;
}   
.img-container:hover .card-img-top{
    transform: scale(1.2);
}
.card-btn {
    position: absolute;
    bottom:0;
    left:0;
    padding: 0.2rem 0.7rem;
    background: var(--mainColor);
    border: none;
    color: var(--mainDark);
    font-size: 1.4rem;
    border-radius: 0 0.5rem 0 0;
    transform: translate(600%, 50%);
    transition: all 0.3s linear;
}
.img-container:hover .card-btn {
    transform: translate(0, 0);
}
`;
