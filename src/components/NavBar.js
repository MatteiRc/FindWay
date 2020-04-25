import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import styled from 'styled-components';
import {ButtonContainer, ButtonServicos} from './Button.js';

export default class Navbar extends Component{
    render(){
        return (<NavWrapper className = "navbar navbar-expand-sm navbar-dark px-sm-5" >
            
                    <Link to='/'>
                        <img src={logo} alt="principal" className="navbar-brand"/>        
                    </Link>    
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">
                                <ButtonServicos>
                                    <span className="mr-2"> 
                                        <i className="fas fa-handshake"></i>
                                    </span>
                                    Serviços
                                </ButtonServicos>
                            </Link>   
                        </li> 
                    </ul>
                    <Link to='/favoritos' className="ml-auto">
                        <ButtonContainer>
                            <span className="mr-2">
                                <i className="fas fa-star" />
                            </span>
                            favoritos
                        </ButtonContainer>
                    </Link>
                </NavWrapper>
            );
    }
}

const NavWrapper = styled.nav`
    background: var(--mainColor);
    .nav-link{
        color: var(--mainWhite) !important;
        font-size:1.5rem;
        text-transform: capitalize;
    }
`;
