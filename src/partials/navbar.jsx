import { useState } from 'react';
import { Link } from "react-router-dom";
import img from "../assets/avatares/neutro.png";
import imgHome from "../assets/icons/HOMEPAGE.png";
import imgCommunity from "../assets/icons/COMMUNITYS.png";
import imgBuscar from "../assets/icons/BUSCAR.png";
import imgMensajes from "../assets/icons/MENSAJES.png";
import imgNotification from "../assets/icons/NOTIFICATIONS.png";
import imgBuho from "../assets/icons/buho.png";
import { useAuth } from "../providers/AuthProvider"
import DropdownSolicitudes from '../components/DropdownSolicitudes'; // Importa el componente
import { Logout } from './logout';

const Navbar = () => {
    const { usuario } = useAuth()
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [options, setOptions] = useState(false)

    const toggleOptions = () => {
        setOptions(!options);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    return <>
        {
            usuario ?
                <header className='h-fit'>
                    <nav className="w-full h-17 flex justify-between items-center ">
                        <div className=" h-20 text-slate-950 flex items-center justify-center ">
                            <div onClick={() => toggleOptions()} className="flex flex-row items-center justify-center p-2">
                                <img src={usuario.imagen || img} alt="Gossip-web" className="max-w-full w-20 h-20 rounded-full object-cover border-2 border-[#306bac]" />
                                <h1 className="hidden -m-1 -mt-3.5 px-5 text-3xl sm:block">{usuario.nombre}</h1>
                            </div>
                        </div>
                        <div className=" h-20 text-slate-950 flex items-center justify-center ">
                            <h1 className="text-5xl font-bold ">Gossip-Web</h1>
                        </div>
                        <div className=" h-20 text-slate-950 flex items-center justify-center ">
                            <img src={imgBuho} alt="Gossip-web" className="max-w-full w-24 mb-1" />
                        </div>
                    </nav>

                    <nav className="w-full h-16 bg-[#6f9ceb] border-[#306bac] border-4">
                        <div className="w-full h-14 flex justify-center items-center text-white px-4 sm:px-20 py-5">
                            <div className="w-full flex items-center justify-between font-normal px-2 sm:px-4 space-x-4">
                                <Link to="/homepage" className="flex-1 flex items-center justify-center hover:text-gray-300">
                                    <img src={imgHome} alt="Homepage" className="max-w-full w-8 sm:w-12" />
                                </Link>
                                <Link to="/search" className="flex-1 flex items-center justify-center hover:text-gray-300">
                                    <img src={imgBuscar} alt="Buscar" className="max-w-full w-8 sm:w-12" />
                                </Link>
                                <Link to="/homepage/postForm" className="flex-1 flex items-center justify-center hover:text-gray-300">
                                    <img src={imgCommunity} alt="Comunidades" className="max-w-full w-8 sm:w-12" />
                                </Link>
                                <Link to="/chats" className="flex-1 flex items-center justify-center hover:text-gray-300">
                                    <img src={imgMensajes} alt="Mensajes" className="max-w-full w-8 sm:w-12" />
                                </Link>

                                <div className="relative flex-1 flex">
                                    <button onClick={toggleDropdown} className="flex-1 flex items-center justify-center hover:text-gray-300">
                                        <img src={imgNotification} alt="Notificaciones" className="max-w-full w-8 sm:w-12" />
                                    </button>
                                    <div className={`absolute right-0 mt-10 ${isDropdownVisible ? 'block' : 'hidden'}`}>
                                        <DropdownSolicitudes />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className={options ? "block" : "hidden"}>
                        <Logout userId={usuario.id} salir={() => toggleOptions()} />
                    </div>
                </header > : <></>
        }
    </>
};

export default Navbar;