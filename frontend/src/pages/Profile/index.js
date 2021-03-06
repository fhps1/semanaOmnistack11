import React, {useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import{FiPower, FiTrash2} from "react-icons/fi";
import './style.css';

import api from '../../services/api';

export default function Profile(){
    const history = useHistory();
    
    const [incidents, setIncidents] = useState([]);

    //deu erro pq usei D maiúsculo para definir a variável de storage local
    const ongId = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');
    
    //função react para ajudar a buscar o id de quem está logado
    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization:ongId,
            }
        }).then(response=>{
            setIncidents(response.data);
        })
    }, [ongId]);
    
    //função para deletar um incidente
    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization:ongId,
                }
            });
            //manter apenas renderizado os incidentes não deletados
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert(err);
        }
    }

    //função de logout
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button" >
                    <FiPower size = {18} color = "#E02041"/>
                </button>   
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map( incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO: </strong>
                        <p>{incident.description}</p>

                        <strong>VALOR: </strong>
                        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)} reais</p>

                        <button onClick={()=> handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}