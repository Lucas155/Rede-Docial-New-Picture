import React from 'react'

const Comentario = () => {

const [comentarios, setComentarios] = React.useState([]);
const [input, setInput] = React.useState('');
const inputElement = React.useRef('');
const author = React.useState('lucas');

function handClick(){
    setComentarios([...comentarios, ]);
    setInput('');
    inputElement.current.focus();
    console.log(input)
}

    return (
        <div>       
            <ul>
                {comentarios.map((comentarios) => (
                    <li key={comentarios}>{comentarios}</li>
                ))}
            </ul>
            <div>
                <input type="text" ref={inputElement} value={input} onChange={({ target }) => setInput(target.value)}/>
                <br/>
                <button onClick={handClick}>Enviar</button>
            </div>
        </div>
    )
}

export default Comentario;



