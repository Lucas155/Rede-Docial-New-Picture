import React from 'react'
import styles from './navbar.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import Like from '../../Assets/like.png';
import Logo from '../../Assets/usuario.png';
import Messagem from '../../Assets/chat.png';
import home from '../../Assets/home.png';
import signout from '../../Assets/signout.png';
import publicacao from '../../Assets/public.png';
import { UserContext } from '../../UserContext';

const Header = () => {

const {useState} = React;
const [visible, setVisible] = useState(false);
const { userLogout } = React.useContext(UserContext);

const data = window.location.pathname;

    return (
        <div>
   
            {data ?  (
                 
                <ul>
                    <li className={styles.opcoes} ><NavLink to="/feed" className={styles.logo}>New Picture</NavLink></li>
                    <li class={styles.dropdown}>
                        <a href="javascript:void(0)" class={styles.dropbtn}><img src={Logo} alt="logo"/></a>
                        <div class={styles.dropdownContent}>
                        <a><NavLink to="/perfil"><img className={styles.icone} src={Logo} alt="logo"/>Perfil</NavLink></a>
                        <a><NavLink to="/perfilPost"><img className={styles.icone} src={publicacao} alt="logo"/>Publicação no feed</NavLink></a>
                        <a><NavLink to="/Configuracoes"><img className={styles.icone} src={publicacao} alt="logo"/>Configurações</NavLink></a>
                        <a onClick={userLogout}><NavLink to="/"><img className={styles.icone} src={signout} alt="logo"/>Sair</NavLink></a>
                        </div>
                    </li>
                    <li><NavLink to="/feed"><img src={Like} alt="home"/></NavLink></li>
                    <li><NavLink to="/chat"><img src={Messagem} alt="messagem"/></NavLink></li>
                    <li className={styles.opcoes}><NavLink to="/feed"><img src={home} alt="home"/></NavLink></li>

                </ul>

            ) : (
                    <div></div>
            )}

        </div>
    )
}

export default Header

