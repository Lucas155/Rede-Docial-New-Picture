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
const [data, setData] = React.useState(null);

function handelClick (){
    setAtivo(!ativo);
    setDados({...dados, faculdade: 'possui Faculdade'});
}

function handelClick1 (){
    setContar(contar + 1 );
    setItems([...items, 'Item' + (contar + 1)]);
}

React.useEffect(() => {

    fetch('http://localhost:8080/api', {

    })
      .then((response) => {
       console.log(response);
        return response.json();
      })
      .then((json) => {
         setData(json);
         console.log(json);
         return json;        
     });
     
}, []);

    console.log(data);

    if(data)
    
    return (
        <div>
            <Header/>

           {data.map((photo) => (
                <div>      
                    <div>
                        <div className='post'>
                            <h5>Titulo</h5>
                            <img className='' src={photo.url_imagem}/>
                            <textarea className='input-coment' placeholder="Adicione um comentário..."/>
                        </div>                        
                    </div>
                </div>
           ))}

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
    );
    else return null;
}

export default Feed;