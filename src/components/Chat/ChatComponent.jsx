import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import './ChatStyle.css';
import { useParams } from 'react-router-dom';
import { useRefresh } from '../../providers/RefreshProvider';

const ChatComponent = () => {
    const { id, type } = useParams();
    const chatId = id;
    const chatType = type;

    const { usuario, token } = useAuth();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [usersCache, setUsersCache] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(true);
    const messagesContainerRef = useRef(null);
    const [chat, setChat] = useState([]);
    const [title, setTitle] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [toggleInfo, setToggleInfo] = useState(false);
    const { refresh, setRefresh } = useRefresh()

    const fetchChatData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/chats/${chatType}/${chatId}`);
            const chatData = response.data;
            setChat(chatData);

            if (chatType !== 'private') {
                setTitle(chatData.nombre);
                setImagen(chatData.imagen || '');
            }

            if (chatType === 'private') {
                const relatedUser =
                    chatData.amistad.userEnvia.id === usuario.id
                        ? chatData.amistad.userRecibe
                        : chatData.amistad.userEnvia;

                setUsersCache({
                    [relatedUser.id]: relatedUser,
                });

                setTitle(relatedUser.nombre);
                setImagen(relatedUser.imagen || '');
            } else if (chatType === 'group' || chatType === 'community') {
                const userDictionary = chatData.miembros.reduce((acc, miembro) => {
                    const miembroUsuario = chatType === 'group' ? miembro : miembro.usuario;
                    if (miembroUsuario.id !== usuario.id) {
                        acc[miembroUsuario.id] = miembroUsuario;
                    }
                    return acc;
                }, {});
                setUsersCache(userDictionary);
            }
        } catch (error) {
            console.error('Error al cargar el chat:', error);
        }
    };

    const sendMessage = () => {
        if (newMessage.trim() && socketRef.current) {
            socketRef.current.emit('sendMessage', { chatId, chatType, message: newMessage });
            setRefresh(!refresh)
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

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

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
                .then((response) => {
                    setMessages(response.data);
                    setLoadingMessages(false);
                })
                .catch((err) => {
                    console.error('Error obteniendo mensajes:', err);
                    setLoadingMessages(false);
                });

            socketInstance.emit('joinChat', { chatId, chatType });
        });

        socketInstance.on('messageReceived', (message) => {
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
        fetchChatData();
    }, [chatId, chatType, usuario]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleToggleInfo = () => {
        setToggleInfo(!toggleInfo);
    };

    return (
        <div className="flex flex-col h-[calc(100dvh-64px)]">
            {/* Encabezado del chat */}
            <div className="flex justify-between items-center border-b-2 border-slate-900 p-2">
                <h2>{title ? title : <>Cargando Chat</>}</h2>
                {toggleInfo ? (
                    <svg
                        onClick={handleToggleInfo}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                    </svg>
                ) : (
                    <svg
                        onClick={handleToggleInfo}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-9 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                    </svg>
                )}
            </div>

            {/* Contenedor de mensajes */}
            <div
                ref={messagesContainerRef}
                className="chatContainer overflow-y-auto p-[10px] flex-1"
                style={{
                    maxHeight: 'calc(100dvh - 200px)', // Ajustar según diseño
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
                                        <span className="text-[10px] font-bold">
                                            {myMessage ? (
                                                <p className="text-end">@Me</p>
                                            ) : user ? (
                                                <p>@{user.nombre}</p>
                                            ) : (
                                                'Cargando usuario...'
                                            )}
                                        </span>
                                        <p className="text-[16px]">{msg.message}</p>
                                        <div className="w-full text-end -mt-3">
                                            <span className="text-end text-slate-500 text-[9px]">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            {/* Input de mensajes */}
            <div className="p-2">
                <input
                    type="text"
                    className="inputMessage"
                    placeholder="Escribe tu mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <button className="buttonSend" onClick={sendMessage}>
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
