import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import './ChatStyle.css';

const ChatComponent = () => {


    //ESTAS CONSTANTES SE DEBEN ENVIAR A ESTE COMPONENTE YA SEA POR PARAMETRO O COMO PROP
    const chatId = '4'
    const chatType = 'group'


    const { usuario, token } = useAuth();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [usersCache, setUsersCache] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(true);
    const messagesEndRef = useRef(null);
    const [chat, setChat] = useState([])
    const [title, setTitle] = useState(null)
    const [imagen, setImagen] = useState('')

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/chats/${chatType}/${chatId}`);
                setChat(response.data);

                if (chatType !== 'private') {
                    setTitle(response.data.nombre || 'Chat sin título');
                    setImagen(response.data.imagen || '');
                } else {
                    setTitle(null);
                }
            } catch (error) {
                console.error('Error al obtener los datos del chat:', error);
            }
        };

        fetchChatData();
    }, [chatId, chatType]);

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    useEffect(() => {
        if (!token) {
            console.error('Token no disponible. Asegúrate de que el usuario esté autenticado.');
            return;
        }

        const socketInstance = io(process.env.SOCKET_CONNECT, {
            transports: ['websocket'],
            query: {
                token: `Bearer ${token}`,
            },
        });

        socketRef.current = socketInstance;

        socketInstance.on('connect', () => {
            axios
                .get(`${process.env.REACT_APP_API}/chats/mensajes/${chatId}/type/${chatType}`)
                .then((r) => {
                    setMessages(r.data);
                    setLoadingMessages(false);
                })
                .catch((err) => {
                    console.error('Error obteniendo mensajes:', err);
                    setLoadingMessages(false);
                });

            socketInstance.emit('joinChat', { chatId, chatType });
        });

        socketInstance.on('messageReceived', (message) => {
            console.log('Nuevo mensaje recibido:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        socketInstance.on('connect_error', (err) => {
            console.error('Error de conexión:', err);
            setLoadingMessages(false);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Socket desconectado');
            }
        };
    }, [token, chatId, chatType]);

    useEffect(() => {
        const fetchUsers = async () => {
            const userIds = messages.map((msg) => msg.usuarioId);
            const uniqueUserIds = [...new Set(userIds)];
            const filteredUserIds = uniqueUserIds.filter((id) => id !== usuario.id);

            const usersData = {};

            for (const userId of uniqueUserIds) {
                if (!usersCache[userId]) {
                    try {
                        const response = await axios.get(`${process.env.REACT_APP_API}/users/${userId}`);
                        usersData[userId] = response.data;
                    } catch (error) {
                        console.error(`Error obteniendo información del usuario ${userId}:`, error);
                    }
                }
            }
            if (filteredUserIds.length === 1 && chatType == 'private') {
                const friendId = filteredUserIds[0];
                const friend = usersData[friendId];
                if (friend) {
                    setTitle(friend.nombre);
                    setImagen(friend.imagen);
                }
            }

            setUsersCache((prevCache) => ({ ...prevCache, ...usersData }));
        };

        if (messages.length > 0) {
            fetchUsers();
        }
    }, [messages, usersCache, title, chatType]);


    const sendMessage = () => {
        if (newMessage.trim() && socketRef.current) {
            socketRef.current.emit('sendMessage', { chatId, chatType, message: newMessage });
            setNewMessage('');
        }
    };

    const formatTime = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>{title ? title : <>Cargando Chat</>}</h2>
            <div
                className="chatContainer"
                style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    height: '300px',
                    overflowY: 'scroll',
                    scrollbarWidth: 'thin',
                }}
            >
                {loadingMessages ? (
                    <div>Cargando mensajes...</div>
                ) : (
                    <>
                        {messages.map((msg, index) => {
                            const user = usersCache[msg.usuarioId];
                            const myMessage = msg.usuarioId === usuario.id;
                            return (
                                <div
                                    key={index}
                                    className={
                                        myMessage
                                            ? 'mb-4 w-full flex justify-end'
                                            : 'mb-4 w-full flex justify-start'
                                    }
                                >
                                    <div
                                        className="max-w-[70%] w-auto border border-slate-600 p-3"
                                        style={
                                            myMessage
                                                ? {
                                                    borderTopLeftRadius: '12px',
                                                    borderTopRightRadius: '12px',
                                                    borderBottomLeftRadius: '12px',
                                                }
                                                : {
                                                    borderTopLeftRadius: '12px',
                                                    borderTopRightRadius: '12px',
                                                    borderBottomRightRadius: '12px',
                                                }
                                        }
                                    >
                                        <span className="text-base font-bold">
                                            {user ? (
                                                myMessage ? (
                                                    <p className="text-end">@Me</p>
                                                ) : (
                                                    <p>@{user.nombre}</p>
                                                )
                                            ) : (
                                                'Cargando usuario...'
                                            )}
                                        </span>
                                        <p className="text-[17px]">{msg.message}</p>
                                        <div className='w-full text-end -mt-3'>
                                            <span className="text-sm text-gray-500 text-end">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef}></div>
                    </>
                )}
            </div>
            <input
                className='inputMessage'
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage();
                    }
                }}
                placeholder="Escribe un mensaje..."
                style={{ width: '80%', padding: '5px' }}
            />
            <button className="buttonSend" onClick={sendMessage}>
                Enviar
            </button>
        </div>
    );
};

export default ChatComponent;