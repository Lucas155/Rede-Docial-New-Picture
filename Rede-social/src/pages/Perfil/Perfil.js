import React from 'react'
import { GlobalContext } from './GlobalContext';
import Header from '../../components/Header/Header';
import styles from  './stilo-perfil.module.css';
import { UserContext } from '../../UserContext';

const Perfil = () => {
    const global = React.useContext(GlobalContext);
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)
    const [dataPhoto, setDataPhoto] = React.useState(null);
    const {data } = React.useContext(UserContext);

    const Results = () => (
        <div id="results" className="search-results">
          Some Results
        </div>
      )

      function handleClick (){
        global.setContar((contar)=> contar + 1);
      }

      React.useEffect(() => {
        const author = data.Username;

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

    if(dataPhoto)
    return (
      <div>
          <Header/>

          {dataPhoto.map((photo) => (
                <div>      
                    <div>
                        <div className={styles.post}>
                            <img className={styles.teste} src={photo.url_imagem}/>                          
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