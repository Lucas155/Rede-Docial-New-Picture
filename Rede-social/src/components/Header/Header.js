import React from 'react'
import styles from './Navbar.module.css';
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

function click(){

    if(visible == false ){
        setVisible(true)
    }else{
        setVisible(false)
    }
}

const data = window.location.pathname;

    return (
        <div>
   
            {data ?  (
            <div className={styles.header}>
                <ul className={styles.menu}>
                    <li><NavLink className={styles.titulo} to="/feed">New Picture</NavLink></li>
                    <div className={styles.subMenu}>
                        <li class={styles.dropdown}><a class={styles.dropbtn} onClick={click}><img className={styles.icone} src={Logo} alt="logo"/></a></li>
                        {visible && (
                            <div class={styles.dropdownContent}>
                                <a className={styles.alignText}><NavLink to="/perfil"><img className={styles.subIcone} src={Logo} alt="logo"/>Perfil</NavLink></a>
                                <a><NavLink to="/perfilPost"><img className={styles.subIcone} src={publicacao} alt="logo"/>Publicação no feed</NavLink></a>
                                <a><NavLink to="/Configuracoes" ><img className={styles.subIcone} src={publicacao} alt="logo"/>Configurações</NavLink></a>
                                <a onClick={userLogout}><NavLink to="/"><img className={styles.subIcone} src={signout} alt="logo"/>Sair</NavLink></a>
                            </div>
                        )}
                        <li><NavLink to="/feed"><img className={styles.icone} src={Like} alt="home"/></NavLink></li>
                        <li><NavLink to="/chat"><img className={styles.icone} src={Messagem} alt="messagem"/></NavLink></li>
                        <li className={styles.opcoes}><NavLink to="/feed"><img className={styles.icone} src={home} alt="home"/></NavLink></li>
                    </div>
                </ul>
            </div>
            ) : (
                    <div></div>
            )}

        </div>
    )
}

export default Header