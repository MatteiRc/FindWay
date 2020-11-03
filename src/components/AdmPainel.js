import React, { Component } from 'react';
import Produto from './Produto.js';
import Titulo from './Titulo.js';
import {ConsumidorServico} from '../contexto.js';
import {servicos} from '../data.js';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ButtonServicos, ButtonNome} from './Button.js';
import propTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import {
    Input
  } from "mdbreact";
import NavbarInicio from './NavbarInicio.js';
import axios from 'axios';

export default class ListaProduto extends Component {

  state = {
    filtros:"",
    search: "",
    servicos:[],
	usuarios: [],
	displayUsuarios: false
  };

 componentDidMount(){
  axios.get("http://localhost:3001/admUsuarios")
	  .then(res =>{
		let arr = new Array();
		let data = JSON.parse(JSON.stringify(res.data));
		//console.log(data);
		for(let i = 0; i < data.length; i++){
		  let usuario = {
			id: data[i].id,
			nome: data[i].nome
		  }
		  arr.push(usuario);
		}
		this.setState({usuarios:arr});
	  })
 }

 renderUsuario = usuario =>{
		console.log(usuario);
	return (
	<div>
		<p>{usuario.id}</p>
	</div>
	)
 };
 
 displayUsuario = () => {
    this.setState({
        displayUsuarios: !this.state.displayUsuarios
    })
}

  render() {
    const { search } = this.state;
    const filteredServicos = this.state
	
	if ( this.state.displayUsuarios ) {
     var usuarios = (
     <div>
		{filteredServicos.usuarios.map(usuario => {
		return this.renderUsuario(usuario);
		})}
     </div>
     )
	}
	
    return (
      <div>
            <Titulo nome="Painel de administrador"></Titulo>
			      <Button onClick={this.displayUsuario} 
				  variant="contained">Usuarios</Button>

			<Button  variant="contained">Curriculos</Button>
			<Button  variant="contained">Empresas</Button>
			<Button  variant="contained">Vagas</Button>
					{usuarios}
      </div>
    );

  }
}


