import React from 'react'
import './stilo-feed.css';
import {NavLink, useNavigate} from 'react-router-dom';
//import  Notificacao from '../../components/notificação/Notificacao';
//import Comentario from '../../components/Comentario/Comentario';
import Formulario from '../../components/Comentario/Comentario';
import Header from '../../components/Header/Header';

const Feed = () => {
const [ativo, setAtivo] = React.useState(false);
const [dados, setDados] = React.useState({nome: 'Lucas', idade:'26'});
const [contar, setContar] = React.useState(1);
const [items, setItems] = React.useState(['Item 1']);

function handelClick (){
    setAtivo(!ativo);
    setDados({...dados, faculdade: 'possui Faculdade'});
}

function handelClick1 (){
    setContar(contar + 1 );
    setItems([...items, 'Item' + (contar + 1)]);
}


    return (
        <div>
            <Header/>
           {/* <h1>Feed</h1>
           <p>{dados.nome}</p>
           <p>{dados.idade}</p>
           <p>{dados.faculdade}</p>

            <button onClick={handelClick}>{ativo ? 'ativo' : 'Inativo'}</button><br/>

            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
            <button onClick={handelClick1}>{contar}</button>
            <br/> */}
        </div>
    )
}

export default Feed;