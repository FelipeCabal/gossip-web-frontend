import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import './ChatStyle.css';
import { useParams } from 'react-router-dom';
import { useRefresh } from '../../providers/RefreshProvider';
import { VistaInformacionChat } from '../VistaChats/VistaInformacionChat';

const ChatComponent = () => {
    const { id, type } = useParams();
    const { usuario, token } = useAuth();
    const socketRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [usersCache, setUsersCache] = useState({});
    const [newMessage, setNewMessage] = useState('');
    const [loadingMessages, setLoadingMessages] = useState(true);
    const messagesContainerRef = useRef(null);
    const [chat, setChat] = useState(null);
    const [title, setTitle] = useState(null);
    const [imagen, setImagen] = useState(null);
    const [toggleInfo, setToggleInfo] = useState(false);
    const { refresh, setRefresh } = useRefresh();
    const [amigo, setAmigo] = useState({});

    const fetchChatData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/chats/${type}/${id}`);
            const chatData = response.data;
            setChat(chatData);

            if (type !== 'private') {
                setTitle(chatData.nombre);
                setImagen(chatData.imagen || '');
            }

            if (type === 'private') {
                const relatedUser =
                    chatData.amistad.userEnvia.id === usuario.id
                        ? chatData.amistad.userRecibe
                        : chatData.amistad.userEnvia;

                setUsersCache({ [relatedUser.id]: relatedUser });
                setAmigo(relatedUser);
                setTitle(relatedUser.nombre);
                setImagen(relatedUser.imagen || '');
            } else if (type === 'group' || type === 'community') {
                const userDictionary = chatData.miembros.reduce((acc, miembro) => {
                    const miembroUsuario = type === 'group' ? miembro : miembro.usuario;
                    if (miembroUsuario.id !== usuario.id) {
                        acc[miembroUsuario.id] = miembroUsuario;
                    }
                    return acc;
                }, {});
                setUsersCache(userDictionary);
            }
        } catch (error) {
            console.error('Error al cargar el chat:', error);
            setChat(null);
        }
        finally {
            console.log(chat)
        }
    };

    const sendMessage = () => {
        if (newMessage.trim() && socketRef.current) {
            socketRef.current.emit('sendMessage', { chatId: id, chatType: type, message: newMessage });
            setRefresh(!refresh);
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
                .get(`${process.env.REACT_APP_API}/chats/mensajes/${id}/type/${type}`)
                .then((response) => {
                    setMessages(response.data);
                    setLoadingMessages(false);
                })
                .catch((err) => {
                    console.error('Error obteniendo mensajes:', err);
                    setLoadingMessages(false);
                });

            socketInstance.emit('joinChat', { chatId: id, chatType: type });
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
    }, [token, id, type]);

    useEffect(() => {
        fetchChatData();
    }, [id, type, usuario]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleToggleInfo = () => {
        console.log(toggleInfo)
        setToggleInfo(!toggleInfo);
    };

    return (
        <div className='flex'>

            <div className="flex flex-col h-[calc(100dvh-64px)] w-full">
                {/* Encabezado del chat */}
                <div className="flex justify-between items-center border-b-2 border-slate-900 p-2">
                    <h2>{title || 'Cargando Chat...'}</h2>
                    <button onClick={() => handleToggleInfo()} className="toggleInfoButton">
                        {toggleInfo ? <></> :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>

                        }
                    </button>
                </div>

                {/* Contenedor de mensajes */}
                <div
                    ref={messagesContainerRef}
                    className="chatContainer overflow-y-auto p-[10px] flex-1"
                    style={{ maxHeight: 'calc(100dvh - 200px)' }}
                >
                    {loadingMessages ? (
                        <div>Cargando mensajes...</div>
                    ) : (
                        messages.map((msg, index) => {
                            const user = usersCache[msg.usuarioId];
                            const myMessage = msg.usuarioId === usuario.id;
                            return (
                                <div
                                    key={index}
                                    className={myMessage ? 'mb-4 w-full flex justify-end'
                                        : 'mb-4 w-full flex justify-start'}
                                >
                                    <div className="max-w-[70%] w-auto border border-slate-600 p-3"
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
                        })
                    )}
                </div>

                {/* Input de mensajes */}
                <div className="messageInputContainer">
                    <input
                        type="text"
                        className="inputMessage"
                        placeholder="Escribe tu mensaje..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <button className="buttonSend" onClick={() => sendMessage()}>
                        Enviar
                    </button>
                </div>
            </div>
            {
                chat ?
                    <div className={toggleInfo ? 'block' : 'hidden'}>
                        <VistaInformacionChat
                            imagen={imagen ? imagen : null}
                            chatId={id}
                            userId={amigo ? amigo.id : null}
                            nombre={title ? title : null}
                            chatType={type}
                            miembros={chat.miembros ? chat.miembros : null}
                            cerrar={() => handleToggleInfo()}
                        />
                    </div> : <></>
            }
        </div >
    );
};

export default ChatComponent;
