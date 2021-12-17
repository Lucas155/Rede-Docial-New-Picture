import React from 'react'
import styles from './stiloFeedModal.module.css';
import x from '../../Assets/fechar.png';
import excluir from '../../Assets/excluir.png';

const FeedModal = ({photo, setModalPhoto, id}) => {
  const [showResults, setShowResults] = React.useState(null);
  const [dados, setDados] = React.useState(true);

    function handleClick(){
      setModalPhoto(null);
    }

    function deleteImg(){
      const confirm = window.confirm('Tem certeza que deseja deletar? ' + id);
                                                                                                              
      if( confirm == true){
          fetch(`http://localhost:8080/api/${id}`, {
            method: 'POST',
        })
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            return json;        
        });
        window.location.reload();   
      }

    }

    React.useEffect(() => {

        const formData = new FormData();
        formData.append('_id', id); 

      fetch(`http://localhost:8080/postagen/`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
         //console.log(response);
          return response.json();
        })
        .then((json) => {
          setDados(json[0]);
          const Username = window.localStorage.getItem('Username');
          var show = json[0].author;
          if(show == Username){
            setShowResults(true);        
          }

          return json; 
       });

    }, []);

    console.log(dados.comentarios);

    return (
        <div className={styles.modal}>
            
            <div className={styles.photo} >
              <img className={styles.imgs} id={id} src={photo} />
              <div>
                <img className={styles.x} src={x} onClick={handleClick}  />
                { showResults ? 
                <img className={styles.deleteImagem} src={excluir} onClick={deleteImg}/>
                : null }
                <p className={styles.author}>{dados.author}</p>
              </div>

              <div className={styles.comentarios}>
                  <ul className={styles.comments}>
                      <li>
                        <b>{dados.comentarios}</b>
                      </li>
                  </ul>
              </div>
              <div className={styles.curtir}>

              </div>
              <textarea className={styles.inputModal} placeholder="Adicione um comentário.."/>
              <button className={styles.comentar}>Comentar</button>
            </div>
        </div>
    )
}

export default FeedModal
