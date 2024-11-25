
import { useAuth } from '../../providers/AuthProvider';
import './TarjetaChat.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import icono from '../../assets/avatares/neutro.png';



export function TarjetaChat() {

    const tipoChat = "chatPrivado";
    const { chatid } = useParams();
    // eslint-disable-next-line no-undef
    const ENDPOINT_MENSAJES = `${process.env.REACT_APP_API}}/chats/mensajes/${chatid}/type/${tipoChat}/`;
    const { usuario } = useAuth();

    useEffect(() => {
        axios.get(ENDPOINT_MENSAJES)
    })
    return <>
        {usuario ?
            <div className="flex items-center p-4 border-b border-gray-300 hover:bg-gray-100 cursor-pointer">
                <img
                    src={usuario.imagen ? usuario.imagen : icono}
                    alt={`Imagen de usuario`}
                    className="w-12 h-12 rounded-full object-cover"
                ></img>

                <div className="ml-4 flex-1">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                        {usuario.nombre}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm truncate">
                        {usuario.email}
                    </p>
                </div>
            </div> : <></>
        }
    </>
}


