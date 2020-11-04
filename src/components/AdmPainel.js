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
import TableHead from '@material-ui/core/TableHead';
/*import TableContainer from '@material-ui/core/TableContainer';*/
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Adm.css';
import {
    Input
  } from "mdbreact";
import NavbarInicio from './NavbarInicio.js';
import axios from 'axios';

export default class ListaProduto extends Component {

  state = {
	usuarios: [],
	empresas: [],
	curriculos: [],
	vagas: [],
	displayUsuarios: false,
	displayEmpresas: false,
	displayCurriculos: false,
	displayVagas:false
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
			nome: data[i].nome,
			telefone: data[i].telefone,
			estado: data[i].estado,
			cidade: data[i].cidade,
			bairro: data[i].bairro,
			cep: data[i].cep,
			email: data[i].email
		  }
		  arr.push(usuario);
		}
		this.setState({usuarios:arr});
	  })
  axios.get("http://localhost:3001/admEmpresas")
	  .then(res =>{
		let arr = new Array();
		let data = JSON.parse(JSON.stringify(res.data));
		//console.log(data);
		for(let i = 0; i < data.length; i++){
		  let empresa = {
			id: data[i].id,
			nome: data[i].nome,
			telefone: data[i].telefone,
			estado: data[i].estado,
			cidade: data[i].cidade,
			bairro: data[i].bairro,
			cep: data[i].cep,
			email: data[i].email,
			cnpj: data[i].cnpj,
			cargo: data[i].cargo
		  }
		  arr.push(empresa);
		}
		this.setState({empresas:arr});
	  })
  axios.get("http://localhost:3001/admCurriculos")
	  .then(res =>{
		let arr = new Array();
		let data = JSON.parse(JSON.stringify(res.data));
		//console.log(data);
		for(let i = 0; i < data.length; i++){
		  let curriculo = {
			id: data[i].id,
			id_usuario: data[i].id_usuario,
			descricao: data[i].descricao
		  }
		  arr.push(curriculo);
		}
		this.setState({curriculos:arr});
	  })
  axios.get("http://localhost:3001/admVagas")
	  .then(res =>{
		let arr = new Array();
		let data = JSON.parse(JSON.stringify(res.data));
		//console.log(data);
		for(let i = 0; i < data.length; i++){
		  let vaga = {
			id: data[i].id,
			id_usuario: data[i].id_usuario,
			descricao: data[i].descricao
		  }
		  arr.push(vaga);
		}
		this.setState({vagas:arr});
	  })
 }

 renderUsuario = usuario =>{
	return (
	<div>
		<p>{usuario.id}</p>
	</div>
	)
 };
 
 renderUsuario = usuario =>{
	return (
	 <tr>
		<td>{usuario.id}</td>
		<td>{usuario.nome}</td>
		<td>{usuario.telefone}</td>
		<td>{usuario.estado}</td>
		<td>{usuario.cidade}</td>
		<td>{usuario.bairro}</td>
		<td>{usuario.cep}</td>
		<td>{usuario.email}</td>
	</tr>
	)
 };
  renderCurriculo = curriculo =>{
	return (
	 <tr>
		<td>{curriculo.id}</td>
		<td>{curriculo.id_usuario}</td>
		<td>{curriculo.descricao}</td>
	</tr>
	)
 };
 
 renderEmpresa = empresa =>{
	return (
	 <tr>
		<td>{empresa.id}</td>
		<td>{empresa.nome}</td>
		<td>{empresa.telefone}</td>
		<td>{empresa.estado}</td>
		<td>{empresa.cidade}</td>
		<td>{empresa.bairro}</td>
		<td>{empresa.cep}</td>
		<td>{empresa.email}</td>
		<td>{empresa.cnpj}</td>
		<td>{empresa.cargo}</td>
	</tr>
	)
 };
 
 renderVaga = vaga =>{
	return (
	 <tr>
		<td>{vaga.id}</td>
		<td>{vaga.id_usuario}</td>
		<td>{vaga.descricao}</td>
	</tr>
	)
 };
 
 displayUsuarios = () => {
    this.setState({
        displayUsuarios: !this.state.displayUsuarios,
		displayEmpresas: false,
		displayCurriculos: false,
		displayVagas: false
    })
}

 displayEmpresas = () => {
    this.setState({
		displayEmpresas: !this.state.displayEmpresas,
		displayUsuarios: false,
		displayCurriculos: false,
		displayVagas: false
    })
}

 displayCurriculos = () => {
    this.setState({
		displayCurriculos: !this.state.displayCurriculos,
		displayEmpresas: false,
		displayUsuarios: false,
		displayVagas: false
    })
}

 displayVagas = () => {
    this.setState({
        displayVagas: !this.state.displayVagas,
		displayEmpresas: false,
		displayCurriculos: false,
		displayUsuarios: false
    })
}

  render() {
    const { search } = this.state;
    const filteredServicos = this.state
	
	if ( this.state.displayUsuarios ) {
     var usuarios = (
     <div id='Tabelas'>
	    <th>ID</th>
		<th>Nome</th>
		<th>Telefone</th>
		<th>Estado</th>
		<th>Cidade</th>
		<th>Bairro</th>
		<th>CEP</th>
		<th>Email</th>
			{filteredServicos.usuarios.map(usuario => {
			return this.renderUsuario(usuario);
			})}
     </div>
     )
	}
	
	if ( this.state.displayCurriculos ) {
     var curriculos = (
     <div id='Tabelas'>
	 		<th>ID</th>
			<th>ID_Usuario</th>
			<th>Descrição</th>
		{filteredServicos.curriculos.map(curriculo => {
		return this.renderCurriculo(curriculo);
		})}
     </div>
     )
	}
	
	if ( this.state.displayEmpresas ) {
     var empresas = (
     <div id='Tabelas'>
			<th>ID</th>
			<th>Nome</th>
			<th>Telefone</th>
			<th>Estado</th>
			<th>Cidade</th>
			<th>Bairro</th>
			<th>CEP</th>
			<th>Email</th>
			<th>CNPJ</th>
			<th>Cargo</th>
		{filteredServicos.empresas.map(empresa => {
		return this.renderEmpresa(empresa);
		})}
     </div>
     )
	}
	if ( this.state.displayVagas ) {
     var vagas = (
     <div id='Tabelas'>
			<th>ID</th>
			<th>ID_Usuario</th>
			<th>Descrição</th>
		{filteredServicos.vagas.map(vaga => {
		return this.renderVaga(vaga);
		})}
     </div>
     )
	}
	
    return (
      <div>
            <Titulo nome="Painel de administrador"></Titulo>

			<Button onClick={this.displayUsuarios}  variant="contained">Usuarios</Button>
			<Button onClick={this.displayCurriculos}  variant="contained">Curriculos</Button>
			<Button onClick={this.displayEmpresas}  variant="contained">Empresas</Button>
			<Button onClick={this.displayVagas}  variant="contained">Vagas</Button>
			<table>
			{usuarios} {curriculos} {empresas} {vagas}
			</table>
      </div>
    );

  }
}


