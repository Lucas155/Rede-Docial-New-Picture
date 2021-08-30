import React from 'react'
import excluir from '../../Assets/excluir.png';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';
import Header from '../../components/Header/Header';
import styles from  './stiloPerfil.module.css';
import { UserContext } from '../../UserContext';

const Perfil = () => {
    const [id, setId] = React.useState(null);
    const global = React.useContext(GlobalContext);
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    const [dataPhoto, setDataPhoto] = React.useState(null);
    const {data } = React.useContext(UserContext);
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
        const author = data.Username;
        ///const author = 'Lucas';

        const formData = new FormData();
        formData.append('author', author);       

        fetch(`http://localhost:8080/perfil/`, {
            method: 'POST',
           body: formData,
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

    if(dataPhoto)
    return (
      <div>
          <Header/>

          {dataPhoto.map((photo) => (
                <div>      
                    <div>
                        <div className={styles.post}>
                            <a className={styles.exluir}><img value={photo._id} onClick={() => handelClick(setId(photo._id))} className={styles.exluir2}  src={excluir}/></a>                           
                            <img className={styles.teste} value={photo._id} src={photo.url_imagem} />
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