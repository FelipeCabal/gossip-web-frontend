import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import sol_amistad from "../assets/icons/sol_amistad.png";
import sol_comunidad from "../assets/icons/sol_comunidad.png";
import aceptar from "../assets/icons/aceptar.png";
import no_aceptar from "../assets/icons/no_aceptar.png";
import img from "../assets/avatares/neutro.png";

import '../css/DropdownSolicitudes/DropdownSolicitudes.css';

const DropdownSolicitudes = () => {
    const [visibleSection, setVisibleSection] = useState(null);
    const [solicitudes, setSolicitudes] = useState([
        { id: 1, name: 'ElBuhoDeTuVidabb', type: 'amistad', status: 'pendiente' },
        { id: 2, name: 'Carlitxs 123', type: 'amistad', status: 'pendiente' },
        { id: 3, name: 'TeamGossip', type: 'grupo', status: 'pendiente' },
        { id: 4, name: 'LosPanes:)', type: 'grupo', status: 'pendiente' }
    ]);

    const toggleDropdown = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    const handleAction = (id) => {
        setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== id));
    };

    useEffect(() => {
        const interval = setInterval(() => { }, 5000);
        return () => clearInterval(interval);
    }, []);

    const solicitudesAmistad = solicitudes.filter(solicitud => solicitud.type === 'amistad');
    const solicitudesGrupo = solicitudes.filter(solicitud => solicitud.type === 'grupo');

    return (
        <div className="dropdownCentral dropdown-container flex flex-col items-center space-y-4 relative">
            <div className="flex justify-around w-full">
                <div className="dropdown-amistades">
                    <Link to="#" className="flex-1 flex items-center justify-center hover:text-gray-300" onClick={() => toggleDropdown('amistad')}>
                        <img src={sol_amistad} alt="amistad" className="max-w-full w-64 " />
                    </Link>
                </div>

                <div className="dropdown-comunidades">
                    <Link to="#" className="flex-1 flex items-center justify-center hover:text-gray-300" onClick={() => toggleDropdown('grupo')}>
                        <img src={sol_comunidad} alt="comunidad" className="max-w-full w-60 " />
                    </Link>
                </div>
            </div>

            {visibleSection && (
                <div className="`absolute right-0 mt-8">
                    <ul className="w-full">
                        {visibleSection === 'amistad' && solicitudesAmistad.length > 0 ? (
                            solicitudesAmistad.map((solicitud) => (
                                <li key={solicitud.id} className="solicitud-item flex justify-between items-center p-2 border-b">
                                    <img src={img} alt="foto de perfil" className='w-28' />
                                    <span className="text-black">{solicitud.name}</span>
                                    <div className="actions flex space-x-2">
                                        <button onClick={() => handleAction(solicitud.id)}>
                                            <img src={aceptar} alt="aceptar" className="w-8 h-8" />
                                        </button>
                                        <button onClick={() => handleAction(solicitud.id)}>
                                            <img src={no_aceptar} alt="no aceptar" className="w-8 h-8" />
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : visibleSection === 'grupo' && solicitudesGrupo.length > 0 ? (
                            solicitudesGrupo.map((solicitud) => (
                                <li key={solicitud.id} className="solicitud-item flex justify-between items-center p-2 border-b">
                                    <img src={img} alt="foto de perfil" className='w-28' />
                                    <span className="text-black">{solicitud.name}</span>
                                    <div className="actions flex space-x-2">
                                        <button onClick={() => handleAction(solicitud.id)}>
                                            <img src={aceptar} alt="aceptar" className="w-8 h-8" />
                                        </button>
                                        <button onClick={() => handleAction(solicitud.id)}>
                                            <img src={no_aceptar} alt="no aceptar" className="w-8 h-8" />
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="text-black p-2">No tienes solicitudes pendientes en esta sección.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownSolicitudes;
