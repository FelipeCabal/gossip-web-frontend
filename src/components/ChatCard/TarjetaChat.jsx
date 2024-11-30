import { useEffect, useState } from 'react';
import axios from 'axios';
import icono from '../../assets/avatares/neutro.png';

export function TarjetaChat({ nombre, imagen, chatid, tipoChat }) {

    const ENDPOINT_MENSAJES = `${process.env.REACT_APP_API}/chats/mensajes/${chatid}/type/${tipoChat}/`

    const [mensaje, setMensaje] = useState([]);

    useEffect(() => {
        axios.get(ENDPOINT_MENSAJES)
            .then((respuesta) => {
                setMensaje(respuesta.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
            {chatid && (
                <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                    <img
                        src={imagen || icono}
                        className="w-14 h-14 rounded-full object-cover border-2 border-black"
                    />
                    <div className="ml-4 flex-1">
                        <h3 className="font-bold text-gray-800 text-base sm:text-lg truncate">
                            {nombre}
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg truncate">
                            {Array.isArray(mensaje) && mensaje.length > 0
                                ? mensaje[mensaje.length - 1].message.slice(0, 40)
                                : "Sin mensajes recientes"}


                        </p>

                    </div>
                </div>
            )}
        </>
    );
}