import React from 'react';
import './stilo-login.css';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import useForm from '../../Hooks/UseForm';
import {NavLink, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const Login = () => {
    const email = useForm();
    const password = useForm();
    const [login, setLogin] = React.useState(false);
    const navigate = useNavigate();
    const { userLogin, setData, data } = React.useContext(UserContext);
    
    function handleSubmit(event) {
      event.preventDefault();

     const formData = new FormData();
     formData.append("Email", email.value);
     formData.append('Password', password.value);       
  
     fetch('http://localhost:8080/login', {
       method: 'POST',
       body: formData,

     })
       .then((response) => {
        console.log(response);
         return response.json();
       })
       .then((json) => {
         setData(json);
        //console.log(json.Username);
        console.log(json.ok);
        if(json.ok != 'false'){
          navigate('/feed');
        }       
         return json;        
       });

  } 
  //console.log(data);

  return (
    <div>
      <div className="App-login">
        <h1>Entrar no New Picture</h1>
        <form className="login" onSubmit={handleSubmit}>
          <Input label="Email" type="text" name="email" {...email}/>
          <Input label="Senha" type="password" name="password" placeholder="Digite sua senha" {...password} />
          <Button>Entrar</Button>
        </form>

        <div className='subtitulo'>
          <Link className='link' to="/loginReset">Esqueceu sua senha? - </Link>
          <Link className='link'  to="/loginCreate">Inscrever-se no NewPhoto</Link>
        </div> 
      </div>
    </div>
  );
}

export default Login;
