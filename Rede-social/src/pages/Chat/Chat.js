import React from 'react'
import Header from '../../components/Header/Header';
import enviar from '../../Assets/enviar.png';
import styles from './stiloChat.module.css';
const Chat = () => {
    return (
        <section>
            <Header/>

            <div className={styles.chat}>
                <div className={styles.amigos}>
                    <div>
                        <p>teste</p>
                    </div>

                </div>

                <div className={styles.chatConversa}>
                    <div>
                        <p>teste</p>
                    </div>
                    <section>
                        <textarea className={styles.chatMessegen} placeholder="Mensagem..."/>
                        <a className={styles.enviar}><img src={enviar}/></a>                           
                    </section>
                </div>

            </div>

        </section>
    )
}

export default Chat
