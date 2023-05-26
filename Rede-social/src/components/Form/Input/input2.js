import React from 'react'
import './Input2.css';

const Input2 = ({label, type, name, register, value, onChange, error, placeholder}) =>{

    return(
        <>
            <div class="inputGroup">
                <input  class="input" autocomplete="off" id={name} type={type} {...register} value={value}  placeholder={placeholder} onChange={onChange}/>
                {error && <span class="erro">{error.message}</span>}
            </div>
        </>
    )
};

export default Input2