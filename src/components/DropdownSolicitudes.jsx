import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import sol_amistad from "../assets/icons/sol_amistad.png";
import sol_comunidad from "../assets/icons/sol_comunidad.png";
import aceptar from "../assets/icons/aceptar.png";
import no_aceptar from "../assets/icons/no_aceptar.png";
import img from "../assets/avatares/neutro.png";

import '../css/DropdownSolicitudes/DropdownSolicitudes.css';
import axios from 'axios';

const DropdownSolicitudes = () => {
    const enpoint = process.env.REACT_APP_API + "/friend-request/user/received"
    const [solicitudesAmistad, setSolicitudesAmistad] = useState([])
    const [visibleSection, setVisibleSection] = useState('amistad');
    const [solicitudes, setSolicitudes] = useState([
        { id: 1, name: 'ElBuhoDeTuVidabb', type: 'amistad', status: 'pendiente' },
        { id: 2, name: 'Carlitxs 123', type: 'amistad', status: 'pendiente' },
        { id: 3, name: 'TeamGossip', type: 'grupo', status: 'pendiente' },
        { id: 4, name: 'LosPanes:)', type: 'grupo', status: 'pendiente' }
    ]);

    const toggleDropdown = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    const handleActionAccept = (id) => {
        const accept = {
            newStatus: "A"
        }
        axios.patch(process.env.REACT_APP_API + `/friend-request/request/${id}/status`, accept)
            .then((r) => {
                setSolicitudesAmistad(solicitudesAmistad.filter(solicitud => solicitud.id !== id));
            })

    };
    const handleActionReject = (id) => {
        const deny = {
            newStatus: "R"
        }
        axios.patch(process.env.REACT_APP_API + `/friend-request/request/${id}/status`, deny)
            .then((r) => {
                setSolicitudesAmistad(solicitudesAmistad.filter(solicitud => solicitud.id !== id));
            })

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(enpoint);
                setSolicitudesAmistad(response.data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, [enpoint]);


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
                        {visibleSection === 'amistad' && solicitudesAmistad ? <>
                            {solicitudesAmistad.length > 0 ? solicitudesAmistad.map((solicitud) => (
                                <li key={solicitud.id} className="solicitud-item flex justify-between items-center p-2 border-b">
                                    <img src={img} alt="foto de perfil" className='w-28' />
                                    <span className="text-black">{solicitud.name}</span>
                                    <div className="actions flex space-x-2">
                                        <button onClick={() => handleActionAccept(solicitud.id)}>
                                            <img src={aceptar} alt="aceptar" className="w-8 h-8" />
                                        </button>
                                        <button onClick={() => handleActionReject(solicitud.id)}>
                                            <img src={no_aceptar} alt="no aceptar" className="w-8 h-8" />
                                        </button>
                                    </div>
                                </li>
                            )) : <><p className='text-black'>No tienes solicitudes de Amistad</p></>
                            }
                        </>
                            : visibleSection === 'grupo' && solicitudesGrupo.length > 0 ? (
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
                                <></>
                            )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownSolicitudes;
