import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.png';
import styled from 'styled-components';
import {ButtonContainer, ButtonServicos} from './Button.js';

export default class NavbarFav extends Component{
    render(){
        return (<NavWrapper className = "navbar navbar-expand-sm navbar-dark px-sm-5" >
            
                    <Link to='/usuariologado'>
                        <img src={logo} alt="principal" className="navbar-brand"/>        
                    </Link>    
                    
                    <Link to='/usuariologado' className="ml-auto">
                        <ButtonServicos>
                            <span className="mr-2"> 
                                <i className="fas fa-handshake"></i>
                            </span>
                                Currículos
                        </ButtonServicos>
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
