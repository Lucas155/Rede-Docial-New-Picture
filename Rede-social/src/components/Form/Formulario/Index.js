import React from 'react'


const types = {
    cep:{
        regex: /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/,
        message:'Cep invalido'
    },
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Email inválido',
    },
}

const Formulario = () => {

const [value, setValue] = React.useState('');
const [error, setError] = React.useState(null);

function validate(value){
    if (value.length === 0){
        setError('Preencha um valor');
        return false;
    }else if (!types[type].regex.test(value)){
        setError(types[types].message);
        return false;
    }else{
        setError(null);
        return true;
    }
}

function onChange({ target }) {
    if (error) validate(target.value);
    setValue(target.value);
}


    return {
        value,
        setValue,
        error,
        onChange,
        onBlur: () => validate(value),
        validate: () => validate(value),
    } 
}

export default Formulario
