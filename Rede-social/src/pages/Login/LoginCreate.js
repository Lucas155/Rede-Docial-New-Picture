import React from 'react';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import style from './stilo-login.css';
import useForm from '../../Hooks/UseForm';
import { useNavigate } from 'react-router-dom';

const LoginCreate = () => {
    const username = useForm();
    const email = useForm();
    const password = useForm();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        console.log(username.value);
        console.log(email.value);
        console.log(password.value);

        const formData = new FormData();
         formData.append("Username", username.value);
         formData.append('Email', email.value); 
         formData.append('Password', password.value);       
      
         fetch('http://localhost:8080/cadastro', {
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
            <h1>Criar sua conta</h1>
            <form className="login" onSubmit={handleSubmit}>
                <Input label="Usuário" type="text" name="Username" {...username}/>
                <Input label="Email" type="text" name="email" {...email}/>
                <Input label="Senha" type="password" name="password" {...password}/>
                <Button>Inscrever-se</Button>
            </form>
        </div>

    )

}

export default LoginCreate;