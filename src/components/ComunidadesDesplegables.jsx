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
        <div className="rounded-lg w-auto mt-5">
            <h2 className="text-2xl font-bold text-center mb-6">COMUNIDADES</h2>
            <div className=" mt-1 w-auto flex flex-col p-6">
                {comunidades.map((comunidad) => (
                    <div key={comunidad.id} className="flex items-center border-b-2 justify-around  border-b-[#918ef4] w-full">
                        <img src={icono} alt="Icono de búho" className="w-16 sm:w-24 " />
                        <Link className=" text-lg text-center text-[#306bac] font-bold flex-1 mr-3">{comunidad.nombre}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comunidades;
