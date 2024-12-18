import { useEffect, useState } from 'react';
import axios from 'axios';
import icono from '../../assets/avatares/neutro.png';
import { useRefresh } from '../../providers/RefreshProvider';

export function TarjetaChat({ onClick, nombre, imagen, chatid, tipoChat }) {

    const ENDPOINT_MENSAJES = `${process.env.REACT_APP_API}/chats/mensajes/${chatid}/type/${tipoChat}/`

    const [mensaje, setMensaje] = useState([]);
    const { refresh } = useRefresh()

    useEffect(() => {
        axios.get(ENDPOINT_MENSAJES)
            .then((respuesta) => {
                setMensaje(respuesta.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [refresh, tipoChat, chatid]);

    return (
        <>
            {chatid && (
                <div onClick={onClick} className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                    <img
                        src={imagen || icono}
                        className="w-20 h-20 rounded-full object-cover border-2 border-black"
                    />
                    <div className="ml-4 flex-1">
                        <p className="font-bold text-gray-800 text-sm sm:text-xl truncate">
                            {nombre}
                        </p>
                        <p className="text-gray-600 text-xs sm:text-sm truncate">
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