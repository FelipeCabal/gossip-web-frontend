import { Outlet } from "react-router-dom"

import './paginaChats.css'
import ChatComponent from "../../components/Chat/ChatComponent"

export function PaginaChats() {


    return (<>

        <Outlet />

        <div className="contenedor-chats-page">
            <div className="left-column-chats">
                <div className="searchChatCommunity">
                    <input type="search" className="searchChats" placeholder="Buscar o iniciar un chat" />
                    <div className="icon-text-group">
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

                    <div className="icon-text-group">
                        <p className="community-group-private">Grupos</p>
                        <svg className="group" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#374957">
                            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                        </svg>
                    </div>

                    <div className="icon-text-group">
                        <p className="community-group-private">Privadas</p>
                        <svg className="personalChat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            width="30" height="30" stroke-width="1.75">
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        </svg>
                    </div>

                </div>

            </div>

            <div className="right-column-chats">

                <div className="vistaChat"><ChatComponent /></div>

                {
                    //SECCION PARA VISTA DE CHAT PERSONAL 
                }
            </div>
        </div>
    </>
    )
}