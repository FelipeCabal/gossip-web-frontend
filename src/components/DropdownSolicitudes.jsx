import { useState, useEffect } from 'react';
import '../css/DropdownSolicitudes/DropdownSolicitudes.css'; // Asegúrate de crear este archivo CSS

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
        const interval = setInterval(() => {
            // Simular nueva solicitud o actualizar solicitudes (puedes sustituir esto con un API o WebSocket)
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const solicitudesAmistad = solicitudes.filter(solicitud => solicitud.type === 'amistad');
    const solicitudesGrupo = solicitudes.filter(solicitud => solicitud.type === 'grupo');

    return (
        <div className="dropdown-container flex">
            <div className="dropdown-section">
                <button onClick={() => toggleDropdown('amistad')} className="text-black btn-1">Solicitudes de Amistad</button>
                {visibleSection === 'amistad' && (
                    <div className="dropdown">
                        <ul>
                            {solicitudesAmistad.length > 0 ? solicitudesAmistad.map((solicitud) => (
                                <li key={solicitud.id} className="solicitud-item">
                                    <span className="text-black">{solicitud.name}</span>
                                    <div className="actions">
                                        <button onClick={() => handleAction(solicitud.id, 'accept')}>✔️</button>
                                        <button onClick={() => handleAction(solicitud.id, 'reject')}>❌</button>
                                    </div>
                                </li>
                            )) : (
                                <li>No tienes solicitudes de amistad pendientes.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>

            <div className="dropdown-section">
                <button onClick={() => toggleDropdown('grupo')} className="text-black btn-1">Solicitudes de Grupo</button>
                {visibleSection === 'grupo' && (
                    <div className="dropdown">
                        <ul>
                            {solicitudesGrupo.length > 0 ? solicitudesGrupo.map((solicitud) => (
                                <li key={solicitud.id} className="solicitud-item">
                                    <span className="text-black">{solicitud.name}</span>
                                    <div className="actions">
                                        <button onClick={() => handleAction(solicitud.id, 'accept')}>✔️</button>
                                        <button onClick={() => handleAction(solicitud.id, 'reject')}>❌</button>
                                    </div>
                                </li>
                            )) : (
                                <li>No tienes solicitudes de grupo pendientes.</li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DropdownSolicitudes;
