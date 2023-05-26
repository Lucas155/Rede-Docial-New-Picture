import React from 'react'
import styles from './Input.module.css';

const Input = ({label, type, name, register, value, onChange, error}) =>{

    return(
        <div>
            <label>{label}</label>
            <input className={styles.input} id={name} type={type} {...register} value={value} onChange={onChange}/>
            {error && <span className={styles.erro}>{error.message}</span>}
        </div>
        
    )
};

export default Input