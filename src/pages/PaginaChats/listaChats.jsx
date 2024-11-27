import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './ChatCard.css'


const ChatCard = () => {
    const { chatId } = useParams(); // Obtenemos el ID del chat desde la URL
    const { type } = useParams();
    const [chatData, setChatData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los datos del chat
        const fetchChatData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API} /chats/mensajes/${chatId}/ type /${type}`);
                setChatData(response.data); // Guardamos los datos en el estado
            } catch (err) {
                setError(err.response?.data?.message || "Error al cargar los datos del chat");
            } finally {
                setLoading(false);
            }
        };

        fetchChatData();
    }, [chatId]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    const { nombreChat, imagenChat, ultimoMensaje, horaUltimoMensaje } = chatData;

    return (
        <div className="chat-card">
            <img
                className="chat-card__image"
                src={imagenChat}
                alt={`Imagen de ${nombreChat}`}
            />
            <div className="chat-card__details">
                <div className="chat-card__header">
                    <span className="chat-card__name">{nombreChat}</span>
                    {horaUltimoMensaje && (
                        <span className="chat-card__time">{horaUltimoMensaje}</span>
                    )}
                </div>
                <div className="chat-card__message">{ultimoMensaje}</div>
            </div>
        </div>
    );
};

export default ChatCard;
