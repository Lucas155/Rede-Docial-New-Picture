import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import './stilo-Navbar.css';
import Like from './like.png';
import Logo from './usuario.png';
import Messagem from './chat.png';
import home from './home.png';
import signout from './signout.png';
import publicacao from './public.png';

const Header = () => {

const {useState} = React;
const [visible, setVisible] = useState(false);

const data = window.location.pathname;

    return (
        <div>
   
            {data ?  (
                 
                <ul>
                    <li className="opcoes" ><NavLink to="/feed" className="logo">New Picture</NavLink></li>
                    <li class="dropdown">
                        <a href="javascript:void(0)" class="dropbtn"><img src={Logo} alt="logo"/></a>
                        <div class="dropdown-content">
                        <a><NavLink to="/perfil"><img className="icone" src={Logo} alt="logo"/>Perfil</NavLink></a>
                        <a><NavLink to="/perfilPost"><img className="icone" src={publicacao} alt="logo"/>Publicação no feed</NavLink></a>
                        <a><NavLink to="/feed"><img className="icone" src={publicacao} alt="logo"/>Configurações</NavLink></a>
                        <a><NavLink to="/"><img className="icone" src={signout} alt="logo"/>Sair</NavLink></a>
                        </div>
                    </li>
                    <li><NavLink to="/feed"><img src={Like} alt="home"/></NavLink></li>
                    <li><NavLink to="/feed"><img src={Messagem} alt="home"/></NavLink></li>
                    <li className="opcoes"><NavLink to="/feed"><img src={home} alt="home"/></NavLink></li>

                </ul>

            ) : (
                    <div></div>
            )}

        </div>
    )
}

export default Header

