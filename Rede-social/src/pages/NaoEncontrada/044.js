import react from 'react';
import styles from './naoEncontrada.module.css'

const NaoEncontrada = () => {
    return (
        <div>
            <p className={styles.erro}>Erro: 404 - Página não encontrada</p>
        </div>
    )
}

export default NaoEncontrada