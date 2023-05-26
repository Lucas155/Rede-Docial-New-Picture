import React from 'react'
import styles from './InputForm.module.css';

const InputForm = ({label, type, name, value, onChange}) =>{

    return(
        <div>
            <label>{label}</label>
            <input className={styles.inputForm} id={name} type={type} value={value} onChange={onChange}/>
        </div>
    )
};

export default InputForm