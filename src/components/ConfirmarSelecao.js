import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ConsumidorServico} from '../contexto.js'; 
import {ButtonFavorito} from './Button.js';
import propTypes from 'prop-types';
import "../styles/servicos.css"
import Axios from 'axios';

const baseUrl = "http://localhost:3001/updateAnuncio";
const InitialState ={
    anuncio:{titulo:"",
    cidade:"",
    descricao:"",
    horarios:"",
    valor:"",
    imagem:""},
    idUsuario:"",
    isInvalid: false,
    saved: false,
    isEmpty:false
}




export default class Servico extends Component{
     state = {...InitialState};
       
     
     componentDidMount(){
        Axios.get('http://localhost:3001/anuncioUsuario/'+localStorage.getItem("id_servico")).then(res=>{
            let anuncio = {
                titulo:res.data.titulo,
                cidade: res.data.cidade,
                descricao: res.data.descricao,
                horarios: res.data.horarios,
                valor: res.data.valor,
                imagem: ""
            }
            this.setState({anuncio:anuncio});
            console.log(this.state);
        }).catch(error =>{
            alert("não foi possivél resgatar o serviço");
        })
    }

     save(event){
         event.preventDefault();
         const url = baseUrl + "/" + window.localStorage.getItem("id_servico");
         const data = new FormData();
         data.append("file",this.state.anuncio.imagem);
         data.append("cidade",this.state.anuncio.cidade);
         data.append("descricao",this.state.anuncio.descricao);
         data.append("horarios",this.state.anuncio.horarios);
         data.append("valor",this.state.anuncio.valor);
         data.append("titulo",this.state.anuncio.titulo);
         Axios.post(url,data).then(res=>{
             console.log(res);
             window.localStorage.removeItem("id_servico");
             window.location.href = "http://localhost:3000/listaservicos";

         })

     }

     updateField(event){
         const anuncio = {...this.state.anuncio};
         let isEmpty = false;
         anuncio[event.target.name] = event.target.value;
         if(anuncio.cidade == "" || anuncio.descricao == "" || anuncio.horarios == "" || anuncio.valor == "" || anuncio.titulo == "")
             isEmpty = true;
             this.setState({anuncio,isEmpty});
             console.log(this.state.anuncio);

        }

        delete(event){
            event.preventDefault();
            if(window.confirm("Deseja excluir esta serviço?"))
            Axios.post("http://localhost:3001/deletarAnuncio/"+localStorage.getItem("id_servico")).then(res=>{
                alert("Serviço excluido com sucesso");
                window.location.href = "http://localhost:3000/listaservicos";
            }).catch(error => {alert("Não foi possivel excluir o Serviço");
            window.location.href = "http://localhost:3000/listaservicos";})
        }

     displayImg(event){
         let img = document.getElementById("foto");
         img.src = URL.createObjectURL(event.target.files[0]);

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
                <label for = "titulo">UMA ÚLTIMA REVISADA ANTES DE ENVIARMOS SEU CURRÍCULO</label>
                <div class = "input area">
                <label for = "titulo">Objetivo</label>
                <br/>
                <input type = "text" name = "titulo" id = "titulo" value ={this.state.anuncio.titulo} onChange ={e => this.updateField(e)}/>
                </div>
                <div class = "input area">
                <br/>
                <label for = "descricao">Resumo de Qualificações</label>
                <br/> 
                <textarea type = "text" name = "descricao" id = "descricao" value = {this.state.anuncio.descricao} onChange = {e => this.updateField(e)}/>
                </div>
                <div class = "input area">
                <br/>
                <label for = "horarios">Formação Acadêmica</label>
                <br/>
                <input type = "text" name = "horarios" id = "horarios" value ={this.state.anuncio.horarios} onChange = {e => this.updateField(e)}/>
                </div>
                <div class = "File">
                <br/>
                <label for = "imagem">Está insatisfeito com a foto ? Pode alterá-la quando quiser !</label>
                <input type = "file" name="imagem" id="imagem" accept = "imagem/*" onChange ={ e => this.fileSelect(e) }/>
                <br/>
                <img id="foto" width = "100"/>
                <br/>
                </div>
                <div class = "Button area">
                <button id = "cadastrarservico" type = "submit" disabled = {this.state.isEmpty}>Enviar Currículo</button>
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