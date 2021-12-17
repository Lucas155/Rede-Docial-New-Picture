import React from 'react'
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
    const [data, setData] = React.useState(null);
    const navigate = useNavigate();

const userLogout = React.useCallback(async function (){
    window.localStorage.removeItem('Username');
    window.localStorage.removeItem('id');
    navigate('/');
}, [navigate]);


    async function userLogin(email, password){

        const formData = new FormData();
        formData.append("Email", email);
        formData.append('Password', password);       
 
        fetch('http://localhost:8080/login', {
        method: 'POST',
        body: formData,

        })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
        console.log(json);
        setData(json);
        window.localStorage.setItem('Username', json.Username);
        window.localStorage.setItem('id', json._id);
        console.log(json._id);

        if(json.ok != 'false'){
            navigate('/feed');
        }       
            return json;        
        });
    }  

    /*React.useEffect(() =>{
        async function autoLogin(){
            const token = window.localStorage.getItem('token');
            if(token){
                try{
                    setError(null);
                    setLoading(true);
                    const {url, options } = TOKEN_VALIDADE_POST(token);
                    const response = await fetch(url, options);
                    if(!response.ok)throw new Error('Token invalido');
                    await getUser(token);
                    navigate('/feed');
                } catch (err){
                    userLogout();
                }finally {
                    setLoading(false);
                }   
            } else{
                setLogin(false);
            }
        }

        autoLogin();
    }, [userLogout]);*/
    

    return (
        <UserContext.Provider value={{ userLogin, userLogout, data }}>{children}</UserContext.Provider>
    )
}

export default UserContext
