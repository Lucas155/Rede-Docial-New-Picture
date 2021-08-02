import React from 'react';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import style from './stilo-login.css';
import useForm from '../../Hooks/UseForm';
import { useNavigate } from 'react-router-dom';

const LoginReset = () => {
    const email = useForm();
    const password = useForm();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append('Password', password.value);       
      
         fetch(`http://localhost:8080/usuario/${email.value}`, {
           method: 'POST',
           body: formData,

         })
           .then((response) => {
             console.log(response);
             return response.json();
           })
           .then((json) => {
             console.log(json);
             return json;
           });
           
           navigate('/');
    }

    return(
        <div className="App-login">
            <h1>Redefinir Senha</h1>
            <h5>Digite seu e-mail para redefinir uma nova senha</h5>
            <form className="login" onSubmit={handleSubmit}>
                <Input label="Email" type="text" name="email" {...email}/>
                <Input label="Nova Senha" type="password" name="password" {...password}/>
                <Button>Redefinir</Button>
            </form>
        </div>
    )
}

export default LoginReset;