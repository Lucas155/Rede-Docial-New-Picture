import React from 'react';
import styles from './stiloLogin.module.css';
import Input from '../../components/Form/Input/input2';
import Button from '../../components/Form/Button/button';
import useForms from '../../Hooks/UseForm';
import Error from '../../components/Error/Error';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { UserContext } from '../../UserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Login = () => {
    const {userLogin } = React.useContext(UserContext);
    const [formData, setFormData] = React.useState('');

    const validationPost = yup.object().shape({
      email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
      password: yup.string().required("Senha é obrigatória")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPost)
    })

    const onSubmit = data => {
      userLogin(data.email,data.password);
      console.log(data.email,data.password)

    };


  return (
    <div>
      <div className={styles.AppLogin}>
        <h1>Entrar no New Picture</h1>
        <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input  label="Email" type="text" name="email" id="email"  placeholder="Digite seu email" register={register('email')} error={errors.email} />
          </div>
          <div>
            <Input label="Senha" type="password" name="password" placeholder="Digite sua senha" register={register('password')} error={errors.password}/>
          </div>
          <Button>Entrar</Button>
        </form>

        <div className={styles.subtitulo}>
          <Link className={styles.link} to="/loginReset">Esqueceu sua senha? - </Link>
          <Link className={styles.link}  to="/loginCreate">Inscrever-se no New Picture</Link>
        </div> 
      </div>
    </div>
  );
}

export default Login;
