import React from 'react'
import styles from './stiloFeedModal.module.css';
import x from '../../Assets/fechar.png';
import heart from '../../Assets/like_heart.png';
import heart2 from '../../Assets/heart_like_red.png';
import enviar from '../../Assets/enviar.png';
import excluir from '../../Assets/excluir.png';

const FeedModal = ({photo, setModalPhoto, id}) => {
  const [excluirPost, setExcluirPost] = React.useState(null);
  const [dados, setDados] = React.useState(true);
  const [like, setLike] = React.useState(false);
  const [comment, setComment] = React.useState('');

    function handleClick(){
      setModalPhoto(null);
    }

    function clickLike(){

      if(like == false ){
          setLike(true)
      }if(like == true){
          setLike(false)
      }
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
            setExcluirPost(true);        
          }

          return json; 
       });

    }, []);

    console.log(dados.comentarios);
    console.log(dados.coment);

    return (
      <div>
        <div className={styles.modal}>
            <img onClick={handleClick} className={styles.fechar} src={x}/>
            
            <div className={styles.photo} >
              <div>
                <img className={styles.imgs} id={id} src={photo} />
              </div>
              <div>
                <div>
                  <p className={styles.author}>{dados.author}</p>

                  { excluirPost ? 
                  <img className={styles.deleteImagem} src={excluir} onClick={deleteImg}/>
                  : null }
                </div>
                <div className={styles.comentarios}>
                  <p>comentarios</p>
                  
                    {/*dados.coment.map((coment) => (
                            <span>{coment}</span>                        
                    ))*/}
           
                </div>
                <div>
                    <div className={styles.novoComentario}>
                      {like ? (
                          <a onClick={clickLike} className={styles.like}><img src={heart2}/></a>
                          ) : (
                          <a onClick={clickLike} className={styles.like}><img src={heart}/></a>
                      )}
                    </div>
                    <div>
                        <textarea id="comment" name="comment" className={styles.inputComent} placeholder="Adicione um comentário..." value={comment} onChange={({ target }) => setComment(target.value)}/>
                        <a className={styles.enviar}><img src={enviar}/></a>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>  
    )
}

export default FeedModal
