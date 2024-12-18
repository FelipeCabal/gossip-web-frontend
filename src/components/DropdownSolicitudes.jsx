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
    const enpoint2 = process.env.REACT_APP_API + "/chats/group-invitation"
    const [solicitudesAmistad, setSolicitudesAmistad] = useState([])
    const [visibleSection, setVisibleSection] = useState('amistad');
    const [solicitudesGrupo, setSolicitudesGrupo] = useState(null)

    const toggleDropdown = (section) => {
        setVisibleSection(visibleSection === section ? null : section);
    };

    const handleActionAcceptSol = (id) => {
        const accept = {
            newStatus: "A"
        }
        axios.patch(process.env.REACT_APP_API + `/friend-request/request/${id}/status`, accept)
            .then((r) => {
                setSolicitudesAmistad(solicitudesAmistad.filter(solicitud => solicitud.id !== id));
            })

    };
    const handleActionRejectSol = (id) => {
        const deny = {
            newStatus: "R"
        }
        axios.patch(process.env.REACT_APP_API + `/friend-request/request/${id}/status`, deny)
            .then((r) => {
                setSolicitudesAmistad(solicitudesAmistad.filter(solicitud => solicitud.id !== id));
            })

    };
    const handleActionAcceptInv = (id) => {
        axios.post(process.env.REACT_APP_API + `/chats/group-invitation/${id}/accept`)
            .then((r) => {
                setSolicitudesGrupo(solicitudesGrupo.filter(solicitud => solicitud.id !== id));
            })

    };
    const handleActionRejectInv = (id) => {
        axios.delete(process.env.REACT_APP_API + `/chats/group-invitation/${id}/reject`)
            .then((r) => {
                setSolicitudesGrupo(solicitudesGrupo.filter(solicitud => solicitud.id !== id));
            })

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(enpoint);
                console.log(response.data.userEnvia)
                setSolicitudesAmistad(response.data);
            } catch (e) {
                console.error("Error en solicitudes de amistad:", e);
            }

            try {
                const response = await axios.get(enpoint2);
                setSolicitudesGrupo(response.data);
            } catch (e) {
                console.error("Error en solicitudes de grupo:", e);
            }
        };

        fetchData();
    }, [enpoint]);

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
                <div className="`absolute right-0 mt-8 w-[80%]">
                    <ul className="w-full">
                        {visibleSection === 'amistad' && solicitudesAmistad ? <>
                            {solicitudesAmistad.length > 0 ? solicitudesAmistad.map((solicitud) => (
                                <li key={solicitud.id} className="solicitud-item flex justify-between items-center p-2 border-b">
                                    <div className='flex items-center justify-center gap-2'>
                                        <img src={solicitud.userEnvia.imagen || img} alt="foto de perfil" className='w-28 rounded-full h-28 object-cover' />
                                        <span className="text-black">{solicitud.userEnvia.nombre.slice(0, 15)}</span>
                                    </div>
                                    <div className="actions flex space-x-2">
                                        <button onClick={() => handleActionAcceptSol(solicitud.id)}>
                                            <img src={aceptar} alt="aceptar" className="w-12 h-12" />
                                        </button>
                                        <button onClick={() => handleActionRejectSol(solicitud.id)}>
                                            <img src={no_aceptar} alt="no aceptar" className="w-12 h-12" />
                                        </button>
                                    </div>
                                </li>
                            )) : <><p className='text-black'>No tienes solicitudes de Amistad</p></>
                            }
                        </>
                            : visibleSection === 'grupo' && solicitudesGrupo.length > 0 ? (
                                solicitudesGrupo.map((solicitud) => (
                                    <li key={solicitud.id} className="solicitud-item flex justify-between items-center p-2 border-b">
                                        <div className='flex items-center justify-center gap-2'>
                                            <img src={solicitud.grupo.imagen ? solicitud.grupo.imagen : img} alt="foto de perfil" className='w-28 rounded-full h-28 object-cover' />
                                            <span className="text-black">{solicitud.grupo.nombre.slice(0, 15)}</span>
                                        </div>
                                        <div className="actions flex space-x-2">
                                            <button onClick={() => handleActionAcceptInv(solicitud.id)}>
                                                <img src={aceptar} alt="aceptar" className="w-12 h-12" />
                                            </button>
                                            <button onClick={() => handleActionRejectInv(solicitud.id)}>
                                                <img src={no_aceptar} alt="no aceptar" className="w-12 h-12" />
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <><p className='text-black'>No tienes invitaciones a grupos</p></>
                            )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownSolicitudes;
