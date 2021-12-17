import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/index';
import Feed from './pages/Feed/Feed';
import Perfil from './pages/Perfil/Perfil';
import Configuracoes from './pages/Perfil/Configuracoes';
import Chat from './pages/Chat/Chat';
import PerfilPost from './pages/Perfil/PerfilPost';
import LoginCreate from './pages/Login/LoginCreate';
import LoginReset from './pages/Login/LoginReset';
import Teste from './pages/Teste/FormValidado';
import Header from './components/Header/Header';
import { UserStorage } from './UserContext';
import './App.css';
import NaoEncontrada from './pages/NaoEncontrada/044';

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="teste" element={<Teste />} />
          <Route path="feed" element={<Feed />} /> 
          <Route path="perfil" element={<Perfil />} />
          <Route path="PerfilPost" element={<PerfilPost />} /> 
          <Route path="Configuracoes" element={<Configuracoes />} /> 
          <Route path="Chat" element={<Chat />} /> 
          <Route path="loginCreate" element={<LoginCreate />} />
          <Route path="loginReset" element={<LoginReset />} />                    
          <Route path="*" element={<NaoEncontrada/>} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
