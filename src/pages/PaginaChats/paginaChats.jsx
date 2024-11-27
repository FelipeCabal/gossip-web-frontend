import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import { TarjetaChat } from "../../components/ChatCard/TarjetaChat";
import './paginaChats.css'

export function PaginaChats() {
    const { usuario } = useAuth();
    const [chats, setChats] = useState([]);
    const [type, setType] = useState('private');
    const navigate = useNavigate();

    const endpoindPrivate = process.env.REACT_APP_API + "/chats/private";
    const endpoindGroup = process.env.REACT_APP_API + "/chats/group";

    const abrirChat = (type, id) => {
        const ruta = id + "/" + type;
        navigate(ruta);
    };

    useEffect(() => {
        if (!usuario) return;

        if (type === "private") {
            axios.get(endpoindPrivate).then(r => setChats(r.data));
        } else if (type === "group") {
            axios.get(endpoindGroup).then(r => setChats(r.data));
        } else if (type === "community") {
            axios.get(`${process.env.REACT_APP_API}/chats/community/${usuario.id}`)
                .then(r => setChats(r.data));
        } else {
            console.log("tipo de chat invalido");
        }
    }, [type, usuario]);

    return (
        <div className="contenedor-chats-page">
            <div className="left-column-chats">
                <div className="searchChatCommunity">
                    <input type="search" className="searchChats" placeholder="Buscar o iniciar un chat" />

                    <div className="icon-text-group" onClick={() => setType('community')}>
                        <p className="community-group-private">Comunidades</p>
                        <svg className="community" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            width="30" height="30" stroke-width="1.75">
                            <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
                            <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
                            <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
                        </svg>
                    </div>

                    <div className="icon-text-group" onClick={() => setType('group')}>
                        <p className="community-group-private">Grupos</p>
                    </div>

                    <div className="icon-text-group" onClick={() => setType('private')}>
                        <p className="community-group-private">Privadas</p>
                    </div>
                </div>

                {chats.length > 0 ?
                    chats.map(chat => (
                        type !== 'private' ?
                            <TarjetaChat onClick={abrirChat(type, chat.id)} nombre={chat.nombre} tipoChat={type} chatid={chat.id} imagen={chat.imagen} />
                            :
                            <TarjetaChat onClick={abrirChat(type, chat.id)} nombre={chat.friend.nombre} tipoChat={type} chatid={chat.id} imagen={chat.friend.imagen} />
                    ))
                    :
                    <p>No hay chats</p>
                }
            </div>

            <div className="right-column-chats">
                <div className="vistaChat">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
