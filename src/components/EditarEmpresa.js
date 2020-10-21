import React from 'react';
import './login/src/App.css';
import ReactDOM from "react-dom";
import axios from 'axios';
import './login/src/id.css';
const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const numeroRegex = RegExp(
    /\(\d{2,}\) \d{4,}\-\d{4}/
  );
  const cidadeEstadoRegex = RegExp(
    /^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
  );
  const cepRegex = RegExp(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  );
  const cnpjRegex = RegExp(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
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

const id_usuario = window.localStorage.getItem("id");

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        nome: null,
        sobrenome: ' ',
        email: null,
        emailLogin: null,
        password: null,
        passwordLogin: null,
        telefone: null,
        estado: null,
        cidade: null,
        bairro: null,
        cep: null,
        cnpj: null,
        empresa: null,
        cargo: null,
        confirmarSenha: null,
        value:true,
        aprovadoEmail: true,
        aprovadoConfirmarSenha: null,
        aprovadoNome: true,
        aprovadoSobrenome: true,
        aprovadoEstado: true,
        aprovadoCidade: true,
        aprovadoBairro: true,
        aprovadoCep: true,
        aprovadoCnpj: true,
        aprovadoEmpresa: true,
        aprovadoCargo: true,
        aprovadoTelefone: true,
        formErrors: {
          nome: "",
          sobrenome: "",
          email: "",
          emailLogin: "",
          password: "",
          passwordLogin: "",
          cidade: "",
          bairro: "",
          cep: "",
          cnpj: "",
          empresa: "",
          cargo: "",
          estado: "",
          confirmarSenha: "",
          telefone: "",
      }
    };
  }
 componentWillMount(){
  axios.get('http://localhost:3001/usuario/'+id_usuario).then(res=>{
    this.setState({email: res.data.email});
    this.setState({password: res.data.senha});
    this.setState({cep: res.data.cep});
    this.setState({cargo: res.data.cargo});
    this.setState({bairro: res.data.bairro});
    this.setState({cnpj: res.data.cnpj});
    this.setState({empresa: res.data.empresa});
    this.setState({nome: res.data.nome});
    this.setState({estado: res.data.estado});
    this.setState({cidade: res.data.cidade});
    this.setState({telefone: res.data.telefone});
  });
  
 }

  handleSubmit = e => {
      e.preventDefault();
      const usuario = {
        nome: this.state.nome,
        senha: this.state.password,
        telefone: this.state.telefone,
        estado: this.state.estado,
        cidade: this.state.cidade,
        bairro: this.state.bairro,
        cep: this.state.cep,
        cnpj: this.state.cnpj,
        empresa: this.state.empresa,
        cargo: this.state.cargo,
        email: this.state.email,
       };
    //if (formValid(this.state)) 
    if(this.state.aprovadoEmail === true &&
        this.state.aprovadoConfirmarSenha === true &&
        this.state.aprovadoNome === true && this.state.aprovadoSobrenome === true && 
        this.state.aprovadoEstado === true &&
        this.state.aprovadoCidade === true && this.state.aprovadoTelefone === true && this.state.aprovadoEmpresa === true && this.state.aprovadoCargo === true && this.state.aprovadoBairro === true && this.state.aprovadoCep === true && this.state.aprovadoCnpj === true){

        axios.post('http://localhost:3001/updateUsuario/'+id_usuario,usuario)
       .then(res =>{
        localStorage.setItem("id_usuario", res.data);
         window.location.href = "http://localhost:3000/empresalogado";
       })
       
    }else{
      alert('Parece que o cadastro ainda está incompleto');
      console.log(this.state.aprovadoNome === true, this.state.aprovadoSobrenome === true, 
        this.state.aprovadoEmail ===true, 
        this.state.aprovadoConfirmarSenha === true,
        this.state.aprovadoEstado, this.state.aprovadoCidade === true, 
        this.state.aprovadoTelefone)
    }
    //} else {
      //console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  };

  delete(e){
    e.preventDefault()
    window.confirm("ola");
    /*if(window.confirm("Deseja realmente deletar sua conta?"))
    axios.post("http://localhost:3001/deletarUsuario/"+id_usuario).then(res=>{
      localStorage.clear()
      alert("Sua conta foi deletada com sucesso");
      //window.location.href= "http://localhost:3000/";
    }).catch(error => {alert("Não foi possível deletar a conta");})*/
  }

  handleLogin = e =>{
   e.preventDefault();

    const usuario = {
    email: this.state.emailLogin,
    senha: this.state.passwordLogin,
   };

  //if (formValid(this.state)) {
    
     axios.post('http://localhost:3001/loginUsuario',usuario)
     .then(res =>{
       console.log(res);
     })
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
      case "bairro":
        formErrors.bairro =
          (value.length > 3) ? "" : "Bairro invalido";
          this.setState({aprovadoBairro: (value.length > 3)});
        break;
      case "cep":
          formErrors.cep =
          (value.length > 3) && cepRegex.test(value) ? "" : "exemplo 111.111.111-11";
          this.setState({aprovadoCep: (value.length > 3) && cepRegex.test(value)});
        break;
      case "cnpj":
          formErrors.cnpj =
          (value.length > 3) && cnpjRegex.test(value) ? "" : "exemplo 11.111.111/1111-11";
          this.setState({aprovadoCnpj: (value.length > 3) && cnpjRegex.test(value)});
        break;
      case "empresa":
          formErrors.empresa =
            (value.length > 3) && cidadeEstadoRegex.test(value) ? "" : "Empresa invalida";
            this.setState({aprovadoEmpresa: (value.length > 3) && cidadeEstadoRegex.test(value)});
          break;
      case "cargo":
          formErrors.cargo =
            (value.length > 3) && cidadeEstadoRegex.test(value) ? "" : "Cargo invalido";
            this.setState({aprovadoCargo: (value.length > 3) && cidadeEstadoRegex.test(value)});
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
      return(
        <div>
          <form method="get" action="/empresalogado">
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
                value= {this.state.email}
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
                value= {this.state.password}
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
                className={formErrors.empresa.length > 0 ? "error" : null}
                value= {this.state.empresa}
                placeholder="Nome da Empresa"
                type="nome"
                name="empresa"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.empresa.length > 0 && (
                <span className="errorMessage">{formErrors.empresa}</span>
              )}
            </div>
            <div className="firstName">
              <label htmlFor="nome" className="text-title-trabalho">Funcionário</label>
              <input
                className={formErrors.nome.length > 0 ? "error" : null}
                value= {this.state.nome}
                placeholder="Nome do Funcionário"
                type="nome"
                name="nome"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.nome.length > 0 && (
                <span className="errorMessage">{formErrors.nome}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="nome" className="text-title-trabalho">Cargo</label>
              <input
                className={formErrors.cargo.length > 0 ? "error" : null}
                value= {this.state.cargo}
                placeholder="Cargo do fucionário"
                type="nome"
                name="cargo"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cargo.length > 0 && (
                <span className="errorMessage">{formErrors.cargo}</span>
              )}
            </div>
            <div className="firstName">
              <label htmlFor="firstName" className="text-title-trabalho">Estado</label>
              <input
                className={formErrors.estado.length > 0 ? "error" : null}
                value= {this.state.estado}
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
                value= {this.state.cidade}
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
            <div className="firstName">
              <label htmlFor="telefone" className="text-title-trabalho">Bairro</label>
              <input
                className={formErrors.bairro.length > 0 ? "error" : null}
                value= {this.state.bairro}
                placeholder="Bairro da Empresa"
                type="bairro"
                name="bairro"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.bairro.length > 0 && (
                <span className="errorMessage">{formErrors.bairro}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="telefone" className="text-title-trabalho">CEP</label>
              <input
                className={formErrors.cep.length > 0 ? "error" : null}
                value= {this.state.cep}
                placeholder="CEP da Empresa"
                type="cep"
                name="cep"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cep.length > 0 && (
                <span className="errorMessage">{formErrors.cep}</span>
              )}
            </div>
            <div className="firstName">
              <label htmlFor="telefone" className="text-title-trabalho">CNPJ</label>
              <input
                className={formErrors.cnpj.length > 0 ? "error" : null}
                value= {this.state.cnpj}
                placeholder="CNPJ da Empresa"
                type="cnpj"
                name="cnpj"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.cnpj.length > 0 && (
                <span className="errorMessage">{formErrors.cnpj}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="telefone" className="text-title-trabalho">Telefone</label>
              <input
                className={formErrors.telefone.length > 0 ? "error" : null}
                value= {this.state.telefone}
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
              <button type="submit">Atualizar</button>
            </div>
          </form>
        </div>
      )
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
