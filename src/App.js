import React, {Component} from 'react'; 
import {Switch, Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/NavBarLogado.js';
import NavBarFav from './components/NavBarFav.js';
import NavBarServ from './components/NavBarServ.js';
import ListaProdutoLogado from './components/ListaProdutoNaoLogado.js';
import Default from './components/Default.js';
import DetalhesNaoLogado from './components/DetalhesNaoLogado.js';
import DetalhesVaga from './components/DetalhesVaga.js';
import Favoritos from './components/Favoritos/Favoritos.js';
import DetalhesFav from './components/DetalhesFav.js';
import Servicos from './components/Servicos.js'
import Vagas from './components/vagas.js';
import LoginCadastro from './components/login/src/index.js';
import LoginEmpresa from './components/login/src/loginEmpresa.js'
import ListaProduto from './components/ListaProdutoLogado.js';
import DetalhesLogado from './components/DetalhesLogado.js';
import EditarCadastro from './components/EditarCadastro.js';
import ListaServicos from './components/ListaServicos.js';
import Selecao from './components/SelecaoCurriculo.js';
import ConfirmarSelecao from './components/ConfirmarSelecao.js';
import ListaVagas from './components/ListaVagas.js';
import EmpresaLogado from './components/ListaVagasLogado.js';
import CurriculoRecebido from './components/CurriculoRecebido.js';
import EditarServicos from './components/EditarServico.js';
import EditarEMpresa from './components/EditarEmpresa.js';
import DetalhesVagaLogado from './components/DetalhesVagaLogado.js';
function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={ListaProdutoLogado} />
        <Route path="/detalhes" component={DetalhesNaoLogado} />
        <Route path="/detalheslogado" component={DetalhesLogado} />
        <Route path="/login" component={LoginCadastro} />
        <Route path="/loginEmpresa" component={LoginEmpresa} />
        <Route path="/favoritos" component={Favoritos} />
        <Route path="/detalhesfav" component={DetalhesFav} />
        <Route path="/detalhesvaga" component={DetalhesVaga} />
        <Route path="/servicos" component={Servicos} />
        <Route path="/vagas" component={Vagas} />
        <Route path="/usuariologado" component={ListaProduto} />
        <Route path="/empresalogado" component={EmpresaLogado} />
        <Route path="/curriculorecebido" component={CurriculoRecebido} />
        <Route path="/editarcadastro" component={EditarCadastro} />
        <Route path="/listaservicos" component={ListaServicos} />
        <Route path="/selecao" component={Selecao} />
        <Route path="/confirmarselecao" component={ConfirmarSelecao} />
        <Route path="/listavagas" component={ListaVagas} />
        <Route path="/editarservicos" component={EditarServicos} />
        <Route path="/editarempresa" component={EditarEMpresa} />
	      <Route path="/detalhesvagalogado" component={DetalhesVagaLogado} />	
        <Route component={Default} />
        <Navbar />
        <NavBarFav />
        <NavBarServ />
      </Switch>
    </React.Fragment>
  );  
}

export default App;
