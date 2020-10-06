import React from 'react';
import './App.css';
import ReactDOM from "react-dom";
import axios from 'axios';
import './id.css';
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const numeroRegex = RegExp(
  /\(\d{2,}\) \d{4,}\-\d{4}/
);
const cidadeEstadoRegex = RegExp(
  /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
);
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: null,
      sobrenome: null,
      email: null,
      emailLogin: null,
      password: null,
      passwordLogin: null,
      telefone: null,
      estado: null,
      cidade: null,
      confirmarSenha: null,
      value:true,
      aprovadoEmail: null,
      aprovadoConfirmarSenha: null,
      aprovadoNome: null,
      aprovadoSobrenome: true,
      aprovadoEstado: null,
      aprovadoCidade: null,
      aprovadoTelefone: null,
      formErrors: {
        nome: "",
        sobrenome: "",
        email: "",
        emailLogin: "",
        password: "",
        passwordLogin: "",
        cidade: "",
        estado: "",
        confirmarSenha: "",
        telefone: "",
      }
    };
  }

  

  

  handleSubmit = e => {
      e.preventDefault();
      const usuario = {
        nome: this.state.nome + ' ' + this.state.sobrenome,
        senha: this.state.password,
        telefone: this.state.telefone,
        estado: this.state.estado,
        cidade: this.state.cidade,
        email: this.state.email
       };
    //if (formValid(this.state)) 
    if(this.state.aprovadoEmail === true &&
       this.state.aprovadoConfirmarSenha === true &&
       this.state.aprovadoNome === true && this.state.aprovadoSobrenome === true && 
       this.state.aprovadoEstado === true &&
       this.state.aprovadoCidade === true && this.state.aprovadoTelefone === true){
      
        axios.post('http://localhost:3001/usuario',usuario)
       .then(res =>{
         localStorage.setItem("id", res.data.id);
         window.location.href = "http://localhost:3000/empresalogado";
       }).catch(error=>{console.error(error.data)});
    }else{
      alert('Parece que o cadastro ainda está incompleto');
      console.log(this.state.aprovadoEmail,
        this.state.aprovadoConfirmarSenha, 
        this.state.aprovadoNome, this.state.aprovadoSobrenome,
        this.state.aprovadoEstado, this.state.aprovadoCidade, this.state.aprovadoTelefone)
    }
  };

  handleLogin = e =>{
   e.preventDefault();

    const usuario = {
    email:this.state.emailLogin,
    senha: this.state.passwordLogin
   };
       
     axios.post('http://localhost:3001/loginUsuario',usuario)
     .then(res =>{
      localStorage.setItem("id",JSON.stringify(res.data.id));
       console.log(res.data.id);
       window.location.href = "http://localhost:3000/empresalogado";
     }).catch(error=>{
       console.error(error)
      alert('Essa conta não existe');
      });
};
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "nome":
        formErrors.nome =
        (value.length > 3) && cidadeEstadoRegex.test(value) ? "" : "Nome invalido";
        this.setState({aprovadoNome: (value.length > 3) && cidadeEstadoRegex.test(value)});
        break;
      case "sobrenome":
        formErrors.sobrenome =
        (value.length > 3) && cidadeEstadoRegex.test(value) ? "" : "Sobrenome invalida";
        this.setState({aprovadoSobrenome: (value.length > 3) && cidadeEstadoRegex.test(value)});
        break;
      case "cidade":
        formErrors.cidade =
          (value.length > 3) && cidadeEstadoRegex.test(value) ? "" : "Cidade invalida";
          this.setState({aprovadoCidade: (value.length > 3) && cidadeEstadoRegex.test(value)});
        break;
      case "telefone":
        formErrors.telefone = (numeroRegex.test(value) && value.length <= 19 && value.length >= 17)
          ? ""
          : "exemplo +55 (11) 11111-1111";
          this.setState({aprovadoTelefone: (numeroRegex.test(value) && value.length <= 19 && value.length >= 17)});
        break;
      case "estado":
        formErrors.estado =
        (value.length > 3) && cidadeEstadoRegex.test(value) ? "" : "Estado invalido";
        this.setState({aprovadoEstado: (value.length > 3) && cidadeEstadoRegex.test(value)});
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "email invalido";
          this.setState({aprovadoEmail: emailRegex.test(value)});
        break;
      case "emailLogin":
        formErrors.emailLogin = emailRegex.test(value)
          ? ""
          : "email invalido";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimo 6 caracteres" : "";
        formErrors.confirmarSenha =
          this.state.confirmarSenha === value ? "" : "Por favor insira a mesma senha novamente";
          this.setState({aprovadoConfirmarSenha: this.state.password === value});
        break;
        case "confirmarSenha":
          formErrors.confirmarSenha =
            value === this.state.password ? "" : "Por favor insira a mesma senha novamente";
            this.setState({aprovadoConfirmarSenha: value === this.state.password });
          break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, /*() => console.log(this.state)*/);
  };
  Message (state)  {
    const { formErrors } = this.state;
    if (state === true) {
      return(
        <div>
          <form method="get" action="/">
            <button>
                <span className="mr-2"> 
                  <i className="fas fa-arrow-left"></i>
                </span>
                  Voltar
            </button>
          </form>
          <div className="text-title-trabalho col-10 mx-auto text-center text-slanted my-5">
              <h2>Login da Empresa</h2>
            </div>
          <form onSubmit={this.handleLogin} noValidate method = "POST" >
            <div className="email">
              <label htmlFor="emailLogin" className="text-title-trabalho">Email da Empresa</label>
              <input
                className={formErrors.emailLogin.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="emailLogin"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.emailLogin.length > 0 && (
                <span className="errorMessage">{formErrors.emailLogin}</span>
              )}
            </div>
            <div className="password">
            <label htmlFor="passwordLogin" className="text-title-trabalho">Senha</label>
              <input
                className={formErrors.passwordLogin.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="passwordLogin"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="createAccount">
                <button type="submit">Login</button>
              <small className="clique" onClick={this.handleClick}>Cadastre-se gratis!</small>
            </div>
          </form>
        </div>
      )
    }
    else{
      return(
        <div>
          <form method="get" action="/">
            <button>
                <span className="mr-2">
                  <i className="fas fa-arrow-left"></i>
                </span>
                  Voltar
            </button>
          </form>
          <p></p>
          <form onSubmit={this.handleSubmit} noValidate method = "POST">
           <div className="email">
              <label htmlFor="email" className="text-title-trabalho">Email da Empresa</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password" className="text-title-trabalho">Senha</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Senha"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="confirmarSenha" className="text-title-trabalho">Confirmar Senha</label>
              <input
                className={formErrors.confirmarSenha.length > 0 ? "error" : null}
                placeholder="Confirmar Senha"
                type="password"
                name="confirmarSenha"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.confirmarSenha.length > 0 && (
                <span className="errorMessage">{formErrors.confirmarSenha}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="nome" className="text-title-trabalho">Nome da Empresa</label>
              <input
                className={formErrors.nome.length > 0 ? "error" : null}
                placeholder="Nome"
                type="nome"
                name="nome"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.nome.length > 0 && (
                <span className="errorMessage">{formErrors.nome}</span>
              )}
            </div>
            <div className="firstName">
              <label htmlFor="firstName" className="text-title-trabalho">Estado</label>
              <input
                className={formErrors.estado.length > 0 ? "error" : null}
                placeholder="Estado"
                type="estado"
                name="estado"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.estado.length > 0 && (
                <span className="errorMessage">{formErrors.estado}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="telefone" className="text-title-trabalho">Cidade</label>
              <input
                className={formErrors.cidade.length > 0 ? "error" : null}
                placeholder="Cidade"
                type="cidade"
                name="cidade"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cidade.length > 0 && (
                <span className="errorMessage">{formErrors.cidade}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="telefone" className="text-title-trabalho">Telefone</label>
              <input
                className={formErrors.telefone.length > 0 ? "error" : null}
                placeholder="Telefone"
                type="telefone"
                name="telefone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.telefone.length > 0 && (
                <span className="errorMessage">{formErrors.telefone}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Cadastrar</button>
              <small className="clique" onClick={this.handleClick}>Fazer Login</small>
            </div>
          </form>
        </div>
      )
    }
  }

   handleClick = () => {
    this.setState({
      value: !this.state.value
    })
  }

 
  
  render(){
    const { formErrors } = this.state;
    const state = this.state.value;
    return(  
      <div className="wrapper">
        <div className="form-wrapper">
       {this.Message(state)}
        </div>
      </div>
      
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')

);
