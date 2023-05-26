import React from 'react'
import styles from './stiloFeed.module.css';
import enviar from '../../Assets/enviar.png';
import heart from '../../Assets/like_heart.png';
import heart2 from '../../Assets/heart_like_red.png';
import {NavLink, useNavigate} from 'react-router-dom';
//import  Notificacao from '../../components/notificação/Notificacao';
import Comentario from '../../components/Comentario/Comentario';
import Formulario from '../../components/Comentario/Comentario';
import Header from '../../components/Header/Header';
import { UserContext } from '../../UserContext';
import FeedModal from './FeedModal';

const Feed = () => {
const [ativo, setAtivo] = React.useState(false);
const [dados, setDados] = React.useState({nome: 'Lucas', idade:'26'});
const [contar, setContar] = React.useState(1);
const [items, setItems] = React.useState(['Item 1']);
const [feed, setFeed] = React.useState(null);
const [like, setLike] = React.useState(false);
const [comment, setComment] = React.useState('');
const [comentarios, setComentarios] = React.useState([]);
const { data } = React.useContext(UserContext);
const [modalPhoto, setModalPhoto] = React.useState(null);
const [url, setUrl] = React.useState(null);
const [id, setId] = React.useState(null);


function handelClick1 (){
    setContar(contar + 1 );
    setItems([...items, 'Item' + (contar + 1)]);
}

function handleSubmit(event) {
    event.preventDefault();
    setComment('');
    const id = "612c0ed5400750544c50776a";
    const formData = new FormData();
    formData.append("id", id);
    formData.append("comentarios", comment);

    fetch('http://localhost:8080/comentarios', {
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
       //console.log(response);
        return response.json();
      })
      .then((json) => {
        setFeed(json);
         //console.log(json);
         return json;        
     });
     
}, []);

/*
    console.log(feed[0].comentarios);
    console.log(data[0].comentarios.length);

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
    <li>{number}</li>
    );*/

   //console.log(feed[0].comentarios);

   function handleOutSideClick(event){
       console.log(event.target);
       console.log(event.currentTarget);
    }

  function handleClick(event){
      var photo = event.target.src;
      var ids = event.target.id;
      setId(ids);
      
    if(modalPhoto == null){
          setModalPhoto(photo);
    }
  }

    if(feed)
    
    return (
        <div>
            <Header/>

            {modalPhoto && (
                <FeedModal setModalPhoto={setModalPhoto} photo={modalPhoto} comentarios={feed} id={id}/>
            )}

           {feed.map((photo) => (
                <section className={styles.post}>
                    <h5 className={styles.tituloPost}>{photo.author}</h5>
                    <img src={photo.url_imagem} id={photo._id} onClick={handleClick}/>
                    {like ? (
                        <a onClick={clickLike} className={styles.like}><img src={heart2}/></a>
                        ) : (
                        <a onClick={clickLike} className={styles.like}><img src={heart}/></a>
                    )}
                    <div>
                        {/*<ul className={styles.comments}>
                            {feed[0].comentarios.map((comentarios) => (
                                <li key={{comentarios}}>
                                    <b>{photo.author}:</b>
                                    <span>{comentarios}</span>                        
                                </li>
                            ))}
                        </ul>*/}
                    </div>
                    <div>
                        <div className={styles.linha}/>
                        <textarea id="comment" name="comment" className={styles.inputComent} placeholder="Adicione um comentário..." value={comment} onChange={({ target }) => setComment(target.value)}/>
                        <a className={styles.enviar}><img onClick={handleSubmit} src={enviar}/></a>
                    </div>                      
                </section>                        
           ))}
        </div>
    );
    
    else return null;
}

export default Feed;