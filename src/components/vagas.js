import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ConsumidorServico} from '../contexto.js'; 
import {ButtonFavorito} from './Button.js';
import propTypes from 'prop-types';
import "../styles/servicos.css"
import Axios from 'axios';

const baseUrl = "http://localhost:3001/fazeranuncio";
const InitialState ={
    anuncio:{titulo:"",
    cidade: null,
    descricao:"",
    horarios:"",
    valor: 10,
    imagem:"",
    categorias: "vaga",
    classificacao:0},
    idUsuario:"",
    isInvalid: false,
    saved: false,
    isEmpty:true
}


export default class Servico extends Component{
     state = {...InitialState};
       
     

     save(event){
         event.preventDefault();
         const url = baseUrl + "/" + window.localStorage.getItem("id");
         const data = new FormData();
         data.append("file",this.state.anuncio.imagem);
         data.append("cidade",this.state.anuncio.cidade);
         data.append("descricao",this.state.anuncio.descricao);
         data.append("horarios",this.state.anuncio.horarios);
         data.append("valor",this.state.anuncio.valor);
         data.append("titulo",this.state.anuncio.titulo);
         data.append("categoria",this.state.anuncio.categorias);
         Axios.post(url,data).then(res=>{
             console.log(res);
         })
         window.location.href = "http://localhost:3000/empresalogado";

     }

     updateField(event){
         const anuncio = {...this.state.anuncio};
         let isEmpty = false;
         //console.log(event.target.value);
         anuncio[event.target.name] = event.target.value;
         if(anuncio.cidade == "" || anuncio.descricao == "" || anuncio.horarios == "" || anuncio.valor == "" || anuncio.titulo == "" || anuncio.categorias == "")
             isEmpty = true;
             this.setState({anuncio,isEmpty});

        }

     displayImg(event){
         let img = document.getElementById("foto");
         img.src = URL.createObjectURL(event.target.files[0]);

     }

     handleCheck(event){
         const anuncio = {...this.state.anuncio};
         let isEmpty = false;
         if(event.target.checked){
             let categoria;
             if(this.state.anuncio.categorias != ""){
             categoria = this.state.anuncio.categorias;
             categoria += ","+event.target.value;
             }
             else
             categoria = event.target.value;
             anuncio[event.target.name]=categoria
             if(anuncio.cidade == "" || anuncio.descricao == "" || anuncio.horarios == "" || anuncio.valor == "" || anuncio.titulo == "" || anuncio.categorias == "")
             isEmpty = true;
             console.log(categoria);
             this.setState({anuncio,isEmpty});
         }
         else{
             let categorias = this.state.anuncio.categorias;
             let nova_categoria;
             if(categorias.includes(","+event.target.value))
             nova_categoria = categorias.replace(","+event.target.value,"");
             else if(categorias.includes(event.target.value+","))
             nova_categoria = categorias.replace(event.target.value+",","");
             else
             nova_categoria = categorias.replace(event.target.value,"");
             anuncio[event.target.name] = nova_categoria;
             if(anuncio.cidade == "" || anuncio.descricao == "" || anuncio.horarios == "" || anuncio.valor == "" || anuncio.titulo == "" || anuncio.categorias == "")
             isEmpty = true;
             console.log(nova_categoria);
             this.setState({anuncio,isEmpty});
         }
     }

     fileSelect(event){
         const anuncio = {... this.state.anuncio};
         anuncio[event.target.name] = event.target.files[0];
         this.setState({anuncio});
         this.displayImg(event);
         console.log(anuncio.imagem);
     }

     renderForm(){
         return(
            <form method = "POST" onSubmit = {e => this.save(e)}>
                <form method="get" action="/usuariologado">
                    <button>
                    <span className="mr-2">
                        <i className="fas fa-arrow-left"></i>
                    </span>
                        Voltar
                    </button>
                </form>
                <div class = "form">
                <div class = "input area">
                <label for = "titulo">Titulo</label>
                <br/>
                <input type = "text" name = "titulo" id = "titulo" onChange ={e => this.updateField(e)}/>
                </div>
                <div class = "input area">
                </div>
                <div class = "input area">
                <br/>
                <label for = "descricao">Descrição</label>
                <br/>
                <textarea type = "text" name = "descricao" id = "descricao" onChange = {e => this.updateField(e)}/>
                </div>
                <div class = "input area">
                <br/>
                <label for = "horarios">Requisitos</label>
                <br/>
                <textarea type = "text" name = "horarios" id = "horarios" onChange = {e => this.updateField(e)}/>
                </div>
                <div class = "File">
                <br/>
                <label for = "imagem">Escolha uma foto</label>
                <input type = "file" name="imagem" id="imagem" accept = "imagem/*" onChange ={ e => this.fileSelect(e) }/>
                <br/>
                <img id="foto" width = "100"/>
                <br/>
                </div>
                <div class = "Button area">
                <button id = "cadastrarservico" type = "submit" disabled = {this.state.isEmpty}>Cadastrar Vaga</button>
                </div>
            </div>
             </form>
         )
     }
    
    
    
    
    
    
    render(){
         return(
             <div class = "wrapper">
                <div class= "form-wrapper">
                {this.renderForm()}
                </div>
            </div>            
         )
     }


}