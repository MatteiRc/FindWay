import React, { Component } from 'react';
import {servicos, detalheServico} from './data.js';
import axios from 'axios';
const ServicoContexto = React.createContext();

class ProvedorServico extends Component {
    state ={
        servicos: [],
        detalheServico: detalheServico,
        favorito: []
    };
    
    componentDidMount(){
        axios.get('http://localhost:3001/anuncios')
        .then(res=>{
        let arr = new Array();
        let data = JSON.parse(JSON.stringify(res.data));
        for(let i = 0; i < data.length; i++){
            let servico = {
                id: data[i].id,
                titulo: data[i].titulo,
                img: "http://localhost:3001/"+data[i].imagem,
                preco: data[i].valor+'/hora',
                nome: data[i].usuario,
                info: data[i].descricao,
                horario: data[i].horarios, 
                cidade: data[i].cidade,
                classificacao: (data[i].classificacao/data[i].total),
                favorito: false
            };
            arr.push(servico);
        }                                                    
        this.setServicos(arr);
    })
    }
    setServicos = (servico) => {
        let servic = [];
        servico.forEach(item =>{
            const singleItem = {...item};
            servic = [...servic, singleItem];

        });
        this.setState(()=>{
            return {servicos:servic};
        });
    };
    handleDetalhe = (id) => {
        const servico = this.getItem(id);
        this.setState(()=>{
            return {detalheServico:servico}
        })
    };
    addToFavoritos = (id)=>{
        let tempProducts = [...this.state.servicos];
        const index = tempProducts.indexOf(this.getItem(id));
        const servico = tempProducts[index];
        servico.favorito = true;
        servico.cont = 1;
        const preco = servico.preco;
        servico.total = preco;
        this.setState(()=>{
            return { servico:tempProducts, favorito:[...this.state.favorito, servico] }; 
        }, ()=>{console.log(this.state)});
    };
    getItem = (id) =>{
        const product = this.state.servicos.find(item => item.id === id);
        return product;
    };
    removeItem = (id) =>{
        console.log('remove');
        let tempServicos = [...this.state.servicos];
        let tempFavorito = [...this.state.favorito];
        tempFavorito = tempFavorito.filter(item => item.id !== id);
        const index = tempServicos.indexOf(this.getItem(id));
        let removeServico = tempServicos[index];
        removeServico.favorito = false;
        this.setState(()=>{
            return {
                favorito: [...tempFavorito],
                servicos:[...tempServicos]
            }
        })
    };
    render() {
        return (
            <ServicoContexto.Provider value={{
                ...this.state,
                handleDetalhe: this.handleDetalhe,
                addToFavoritos: this.addToFavoritos,
                removeItem: this.removeItem
            }}>
                {this.props.children}
            </ServicoContexto.Provider>
        );
    }
}

const ConsumidorServico = ServicoContexto.Consumer;

export {ProvedorServico, ConsumidorServico}
