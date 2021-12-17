import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import Header from '../../components/Header/Header';
import styles from  './stiloPerfil.module.css';
import { UserContext } from '../../UserContext';
import FeedModal from '../Feed/FeedModal';

const Perfil = () => {
    const [id, setId] = React.useState(null);
    const global = React.useContext(GlobalContext);
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    const [dataPhoto, setDataPhoto] = React.useState(null);
    const [modalPhoto, setModalPhoto] = React.useState(null);

    const navigate = useNavigate();

    const Results = () => (
        <div id="results" className="search-results">
          Some Results
        </div>
      )

      function handleClick2 (){
        global.setContar((contar)=> contar + 1);
      }

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

  {/*
        <h1>Perfil</h1>
        <input type="submit" value="Search" onClick={onClick} />
        { showResults ? <Results /> : null } 

        <div>
        {Produto: {global.contar} }
          <button onClick={handleClick}>Adicionar</button>
          <button onClick={() => global.Adicionar1()}>Adicionar</button>

        </div>
        
      */}