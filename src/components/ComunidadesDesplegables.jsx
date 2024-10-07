import icono from '../assets/avatares/mujer.png';
import { Link } from "react-router-dom"


const Comunidades = () => {
    const comunidades = [
        { id: 1, nombre: 'Los Buhos prohibidos' },
        { id: 2, nombre: 'El consejo de las plumas' },
        { id: 3, nombre: 'Ojitos chiquititos' },
        { id: 4, nombre: 'Los Buhos prohibidos' },
        { id: 5, nombre: 'El consejo de las plumas' },
    ];

    return (
        <div className="bg-white p-8 rounded-lg w-auto">
            <h2 className="text-2xl font-bold text-center mb-6">COMUNIDADES</h2>
            <div className="space-y-6 pt-1">
                {comunidades.map((comunidad) => (
                    <div
                        key={comunidad.id}
                        className="flex items-center border-b-2 justify-around border-b-[#918ef4] pb-1 w-full"
                    >
                        <img src={icono} alt="Icono de búho" className="w-12 " />
                        <Link className="ml-4 text-lg text-center text-[#306bac] font-bold flex-1">{comunidad.nombre}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comunidades;
