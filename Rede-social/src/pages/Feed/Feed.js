import React from 'react'
import styles from './stiloFeed.module.css';
import enviar from '../../Assets/enviar.png';
import heart from '../../Assets/like_heart.png';
import heart2 from '../../Assets/heart_like_red.png';
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
const [like, setLike] = React.useState(false);
const [comment, setComment] = React.useState('');


function handelClick3 (){
    setAtivo(!ativo);
    setDados({...dados, faculdade: 'possui Faculdade'});
}



function handelClick1 (){
    setContar(contar + 1 );
    setItems([...items, 'Item' + (contar + 1)]);
}

function handleSubmit(event) {
    event.preventDefault();
    alert(comment);
    setComment('');
  
  }

function clickLike(){

    if(like == false ){
        setLike(true)
    }if(like == true){
        setLike(false)
    }
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

   /// console.log(data[0].comentarios[0]);

    if(data)
    
    return (
        <div>
            <Header/>

           {data.map((photo) => (
                <section className={styles.post}>
                    <h5>{photo.author}</h5>
                    <img src={photo.url_imagem}/>
                    {like ? (
                        <a onClick={clickLike} className={styles.like}><img src={heart2}/></a>
                        ) : (
                        <a onClick={clickLike} className={styles.like}><img src={heart}/></a>
                    )}
                    {/*data[0].comentarios[0]*/}
                    <div className={styles.linha}/>
                    <textarea id="comment" name="comment" className={styles.inputComent} placeholder="Adicione um comentário..." value={comment} onChange={({ target }) => setComment(target.value)}/>
                    <a className={styles.enviar}><img onClick={handleSubmit} src={enviar}/></a>                           
                </section>                        
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