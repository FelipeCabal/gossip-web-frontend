import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";
import { TarjetaChat } from "../../components/ChatCard/TarjetaChat";
import './paginaChats.css';
import imgNoChats from "../../assets/imgNoChats/imgNoChats.png";

export function PaginaChats() {
    const { usuario } = useAuth();
    const [chats, setChats] = useState([]);
    const [type, setType] = useState('private');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const endpointMap = {
        private: process.env.REACT_APP_API + "/chats/private",
        group: process.env.REACT_APP_API + "/chats/group",
        community: `${process.env.REACT_APP_API}/chats/community/${usuario?.id}`,
    };

    const abrirChat = (id, type) => {
        const ruta = `${id}/${type}`;
        navigate(ruta);
    };

    useEffect(() => {
        if (!usuario) return;

        if (endpointMap[type]) {
            axios
                .get(endpointMap[type])
                .then((response) => setChats(response.data || []))
                .catch(() => setChats([]));
        } else {
            console.error("Tipo de chat inválido.");
            setChats([]);
        }
    }, [type, usuario]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypeChange = async (newType) => {
        setSearchQuery("");
        setType(newType);
    };

    const filteredChats = Array.isArray(chats)
        ? chats.filter((chat) => {
            if (!searchQuery) return true;
            const chatName = type === "private" ? chat?.friend?.nombre : chat?.nombre;
            return chatName?.toLowerCase().includes(searchQuery.toLowerCase());
        })
        : [];


    return (
        <div className="contenedor-chats-page">
            <div className="left-column-chats">
                <div className="searchChatCommunity flex gap-1">
                    <input type="search" className="searchChats" placeholder="Buscar o iniciar un chat" value={searchQuery} onChange={handleSearchChange} />

                    <div className="icon-text-group hover:opacity-50 cursor-pointer" onClick={() => handleTypeChange('community')}>
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

                    <div className="icon-text-group hover:opacity-50 cursor-pointer" onClick={() => handleTypeChange('group')}>
                        <p className="community-group-private">Grupos</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-12 mt-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                        </svg>

                    </div>

                    <div className="icon-text-group hover:opacity-50 cursor-pointer" onClick={() => handleTypeChange('private')}>
                        <p className="community-group-private">Privadas</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12 mt-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>

                    </div>
                </div>

                {filteredChats.length > 0 ? (
                    filteredChats.map((chat) => (
                        <TarjetaChat
                            key={chat.id}
                            onClick={abrirChat(chat.id, type)}
                            nombre={type === "private" ? chat?.friend?.nombre : chat?.nombre}
                            tipoChat={type}
                            chatid={chat.id}
                            imagen={type === "private" ? chat?.friend?.imagen : chat?.imagen}
                        />
                    ))
                ) : (
                    <div>
                        {type === "community"
                            ? "No perteneces a ninguna comunidad."
                            : type === "group"
                                ? "No perteneces a ningún grupo."
                                : "No hay chats."}
                    </div>
                )}
            </div>
            <div className="right-column-chats">
                {filteredChats.length === 0 ? (
                    <div className="image-container">
                        <img src={imgNoChats} alt="no chats yet" className="img-placeholder" />
                    </div>
                ) : (
                    <div className="vistaChat">
                        <Outlet />
                    </div>
                )}
            </div>
        </div>
    );
}
