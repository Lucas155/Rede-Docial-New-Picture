import React from 'react';
import styles from './stiloLogin.module.css';
import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import useForm from '../../Hooks/UseForm';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

const Login = () => {
    const email = useForm();
    const password = useForm();
    const {userLogin } = React.useContext(UserContext);

    function handleSubmit(event) {
      event.preventDefault();

      userLogin(email.value, password.value);
    }

  return (
    <div>
      <div className={styles.AppLogin}>
        <h1>Entrar no New Picture</h1>
        <form className={styles.login} onSubmit={handleSubmit}>
          <Input label="Email" type="text" name="email" {...email}/>
          <Input label="Senha" type="password" name="password" placeholder="Digite sua senha" {...password} />
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
