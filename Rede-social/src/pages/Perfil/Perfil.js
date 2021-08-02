import React from 'react'
import { GlobalContext } from './GlobalContext';
import Header from '../../components/Header/Header';

const Perfil = () => {
    const global = React.useContext(GlobalContext);
    const [showResults, setShowResults] = React.useState(false)
    const onClick = () => setShowResults(true)

    const Results = () => (
        <div id="results" className="search-results">
          Some Results
        </div>
      )

      function handleClick (){
        global.setContar((contar)=> contar + 1);
      }

    return (
    <div>
      <Header/>
        <h1>Perfil</h1>
        <input type="submit" value="Search" onClick={onClick} />
        { showResults ? <Results /> : null } 

        <div>
        {/* Produto: {global.contar} */}
          <button onClick={handleClick}>Adicionar</button>
          <button onClick={() => global.Adicionar1()}>Adicionar</button>

        </div>
        
               
    </div>
    )

}

export default Perfil
