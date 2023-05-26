import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import styles from  './stiloPerfil.module.css';
import { UserContext } from '../../UserContext';
import FeedModal from '../Feed/FeedModal';

const Perfil = () => {
    const [id, setId] = React.useState(null);
    const [dataPhoto, setDataPhoto] = React.useState(null);
    const [modalPhoto, setModalPhoto] = React.useState(null);
    const { data } = React.useContext(UserContext);
    const [name, setName] = React.useState(window.localStorage.getItem('Name'));
    console.log(name);

    const navigate = useNavigate();

      React.useEffect(() => {
        const Username = window.localStorage.getItem('Username');
        const User = window.localStorage.getItem('id');

        const formData = new FormData();
        formData.append('author', Username);

        fetch(`http://localhost:8080/perfil/`, {
            method: 'POST',
            body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            setDataPhoto(json);
             return json;        
         });
         
      }, []);

      function handelClick (){
      const confirm = window.confirm('Tem certeza que deseja deletar? ' + id);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
        if( confirm == true){
            fetch(`http://localhost:8080/api/${id}`, {
              method: 'POST',
          })
            .then((response) => {
            console.log(response);
              return response.json();
            })
            .then((json) => {
              setDataPhoto(json);
              console.log(json);
              return json;        
          });
          window.location.reload();   
        }

      }

    function handleClick2(event){

      var photo = event.target.src;
      var ids = event.target.id;
      setId(ids);

      if(modalPhoto == null){
        setModalPhoto(photo);
      }
    }

    if(dataPhoto)
    
    return (
      <div>
          <Header/>

          <div className={styles.userContainer}>
            <div className={styles.userPhoto}>
              <img className={styles.userPhoto} src='https://github.com/lucasdev155.png'></img>
            </div>
            <div className={styles.userDados}>
              <span>Publicações <b>{dataPhoto.length}</b></span>
              <span>Seguidores <b>10</b></span>
              <span>Seguindo <b>10</b></span>
              <h4>{name}</h4>
            </div>
          </div>

          {modalPhoto && (
                <FeedModal setModalPhoto={setModalPhoto} photo={modalPhoto} comentarios={dataPhoto} id={id} />
          )}

          {dataPhoto.map((photo) => (
                <div>      
                    <div>
                        <div className={styles.post}>             
                           <img className={styles.teste} id={photo._id} src={photo.url_imagem} onClick={handleClick2} />                          
                        </div>                        
                    </div>
                </div>
           ))}

      </div> 
    );

  else return null;

}

export default Perfil