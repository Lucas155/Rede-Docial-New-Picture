import React from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
    const [contar, setContar] = React.useState(1);
    
    function Adicionar1 (){
        setContar(contar => contar + 1);
    }

    return (
        <GlobalContext.Provider value={{contar, setContar, Adicionar1}}>
            {children}
        </GlobalContext.Provider>
    )
}