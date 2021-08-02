import React from 'react'
import useForm from './useForm';



const FormValidado = () => {

    const cep = useForm('cep');
    const email = useForm('email');
    const nome = useForm();
    const sobrenome = useForm(false);
  
    function handleSubmit(event) {
      event.preventDefault();
      if (cep.validate() && email.validate() && nome.validate()) {
        console.log('Enviar');
      } else {
        console.log('Não enviar');
      }
    }
    console.log('Cep' + cep)
    console.log(email)

    return (
        <form onSubmit={handleSubmit}>
            <input label="Nome" id="nome" type="text" {...nome} />
            <input label="Sobrenome" id="sobrenome" type="text" {...sobrenome} />
            <input
                label="CEP"
                id="cep"
                type="text"
                placeholder="00000-000"
                {...cep}

            />
            <input label="Email" id="email" type="email" {...email} />
            <button>Enviar</button>
        </form>
    )
}

export default FormValidado
