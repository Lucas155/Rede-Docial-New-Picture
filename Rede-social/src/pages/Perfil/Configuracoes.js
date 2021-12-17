import React from 'react';
import Header from '../../components/Header/Header';
import styles from './stiloConfiguracoes.module.css';
import Input from '../../components/Form/Input';
import useForm from '../../Hooks/UseForm';
import { UserContext } from '../../UserContext';
import Button from '../../components/Form/Button';

const Perfil = () => {
    const {data } = React.useContext(UserContext);
    const nome = useForm();
    const Username = useForm();
    const Email = useForm();
    const Password = useForm();

    function handleSubmit(event){
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", data._id);
        formData.append("Username", Username.value);
        formData.append("Email", Email.value);
        formData.append("Password", Password.value);

         fetch('http://localhost:8080/usuarioUpdate', {
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

    }
    
    function handleChange(event){
      console.log(event.target.value);
    }
    

    //console.log(data.Username);
    //console.log(Email);

//if(data)
  return (
      <section>
          <Header/>
          <div className={styles.configuracoes}>
            <h1>Editar perfil</h1>
            <form onSubmit={handleSubmit}>
                {/*<Input label='Nome' name="nome" {...Username} />*/}
                <Input label='Email' name="email" {...Email} />
                <Input label='Senha' type="senha" {...Password}/>

                <Button>Atualizar Dados</Button>
            </form>
          </div>
      </section>
  );
}

export default Perfil;