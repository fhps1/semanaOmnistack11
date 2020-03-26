import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './style.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi';//icone login

import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleId(e){
        e.preventDefault();
        try{
            const response = await api.post('sessions', {id});
            
            //armazena no browser as informações de quem está logado
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');//vai até o perfil logado
        }catch(err){
            alert(err);
        }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit ={handleId}>
                <h1>Faça seu logon</h1>
                <input 
                    placeholder = "Sua ID"
                    value={id}
                    onChange={e=>setId(e.target.value)}
                />
                <button className = "button" type="submit">Entrar</button>
                <Link className = "back-link" to="/register">
                    <FiLogIn size={16} color = "#E02041"/>
                    Não tenho cadastro
                </Link>
            </form>
            </section>
            <img src = {heroesImg} alt = "Heroes"></img>  
        </div>
    );
}