import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

export function VistaInformacionChat(imagen, chatId, userId, nombre, chatType) {
    const navigate = useNavigate()
    const alerta = () => toast.error('Saliste del chat exitosamente')
    
    const eliminar_user = (idUser) => {
        const ENDPOINT_DELETE_USER = process.env.REACT_APP_API + "/chats/"+chatType + "/" + chatId + "/miembros/" + idUser
        
        axios.delete(ENDPOINT_DELETE_USER)
            .then(() => {

                alerta
             })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="w-[290px]">
                <div className="h-screen !xs:h-full !xs:pr-4 sm:bg-[#E7E7E7] !xs:mt-4 !xs:m-[16px] !xs:bg-fuchsia-50 w-full">
                    <section className="border-b-2 border-[#ABABAB]">
                        <div className="flex ml-2 mt-2 items-center gap-4 relative group">
                            <button className="transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" strokeWidth={2} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <span className="text-2xl font-semibold">Info. del chat</span>
                        </div>
                        <div className="flex flex-col ">
                            <div className="flex justify-center mt-8 mb-0">
                                <img src={imagen} alt="perfil" className="h-[90px] w-[90px]" />
                            </div>
                            <h3 className="flex justify-center font-medium">{nombre}</h3>
                        </div>
                        {chatType === "private" ? <><div className="flex  justify-evenly mt-5 mb-4">
                            <div className="flex flex-col items-center relative group">
                                <Link to={`/perfil/${userId}`} className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 22 22"
                                        strokeWidth={1.8}
                                        stroke="currentColor"
                                        className="size-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                </Link>
                                <span className="text-2xl font-semibold items-center">Perfil</span>
                            </div>
                        </div></> : <><div className="mb-3"></div>
                        </>}
                        
                    </section>
                    <section className="border-b-2 border-[#ABABAB]">
                        <h3 className="text-2xl font-semibold ml-3 mt-2">Archivos compartidos</h3>
                        <div className=" flex gap-4 ml-3 mt-3 mb-4">
                            <img src="https://i.pinimg.com/736x/cb/2c/74/cb2c74dbf4a73674f2d2cd87c3f7ccd2.jpg" alt="imagen compartida" className="w-[64px] h-[64px] rounded-3xl" />
                            <img src="https://i.pinimg.com/736x/5e/fa/ea/5efaeababb2e319be8d5d7f6ea61f5fe.jpg" alt="imagen compartida" className="w-[64px] h-[64px] rounded-3xl" />
                            <img src="https://i.pinimg.com/736x/84/e5/6f/84e56fa89585cdaff7d828406b957f52.jpg" alt="imagen compartida" className="w-[64px] h-[64px] rounded-3xl" />
                        </div>
                    </section>
                    {
                        chatType !== "private" ? (<>
                            <div className="border-b-2 border-[#ABABAB] w-full">
                                <h3 className="text-2xl font-medium ml-3">Integrantes</h3>
                                {miembros.map((miembro) => (
                                    <div key={miembro.id} className="w-full flex gap-2 ml-3 mt-2 mb-4 items-center border-none">
                                        <img src={miembro.imagen} alt="" className="h-12 w-12 rounded-full border-none" />
                                        <span className="h-auto flex text-xl font-semibold items-center justify-start flex-wrap w-full" style={{wordBreak:"break-word"}}>{miembro.nombre}</span>
                                        <div className=" flex justify-end gap-3 items-center relative group mr-4">
                                            <button onClick={eliminar_user(miembro.id)} className="transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </button>
                                            
                                        </div>
                                    </div>

                                ))}

                            </div>
                            {chatType === "community" ? <><div className="flex gap-3 items-center relative group ml-2 mt-2">
                                <button className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <g clip-path="url(#clip0_673_899)">
                                            <path d="M11.476 15C11.2108 15 10.9564 15.1054 10.7689 15.2929C10.5814 15.4804 10.476 15.7348 10.476 16V19C10.476 19.7956 10.1599 20.5587 9.59732 21.1213C9.03471 21.6839 8.27165 22 7.476 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H7.476C8.27165 2 9.03471 2.31607 9.59732 2.87868C10.1599 3.44129 10.476 4.20435 10.476 5V8C10.476 8.26522 10.5814 8.51957 10.7689 8.70711C10.9564 8.89464 11.2108 9 11.476 9C11.7412 9 11.9956 8.89464 12.1831 8.70711C12.3706 8.51957 12.476 8.26522 12.476 8V5C12.4744 3.67441 11.9471 2.40356 11.0098 1.46622C10.0724 0.528882 8.80159 0.00158786 7.476 0H5C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H7.476C8.80159 23.9984 10.0724 23.4711 11.0098 22.5338C11.9471 21.5964 12.4744 20.3256 12.476 19V16C12.476 15.7348 12.3706 15.4804 12.1831 15.2929C11.9956 15.1054 11.7412 15 11.476 15Z" fill="#000000" />
                                            <path d="M22.867 9.8792L18.281 5.2932C18.1888 5.19769 18.0784 5.12151 17.9564 5.0691C17.8344 5.01669 17.7032 4.98911 17.5704 4.98795C17.4376 4.9868 17.3059 5.0121 17.183 5.06238C17.0602 5.11266 16.9485 5.18692 16.8546 5.28081C16.7607 5.3747 16.6865 5.48635 16.6362 5.60925C16.5859 5.73215 16.5606 5.86383 16.5618 5.9966C16.5629 6.12938 16.5905 6.2606 16.6429 6.38261C16.6953 6.50461 16.7715 6.61496 16.867 6.7072L21.129 10.9702L6 11.0002C5.73478 11.0002 5.48043 11.1056 5.29289 11.2931C5.10536 11.4806 5 11.735 5 12.0002C5 12.2654 5.10536 12.5198 5.29289 12.7073C5.48043 12.8948 5.73478 13.0002 6 13.0002L21.188 12.9692L16.865 17.2932C16.7695 17.3855 16.6933 17.4958 16.6409 17.6178C16.5885 17.7398 16.5609 17.871 16.5598 18.0038C16.5586 18.1366 16.5839 18.2683 16.6342 18.3912C16.6845 18.5141 16.7587 18.6257 16.8526 18.7196C16.9465 18.8135 17.0582 18.8877 17.181 18.938C17.3039 18.9883 17.4356 19.0136 17.5684 19.0125C17.7012 19.0113 17.8324 18.9837 17.9544 18.9313C18.0764 18.8789 18.1868 18.8027 18.279 18.7072L22.865 14.1212C23.4277 13.5589 23.744 12.7961 23.7444 12.0006C23.7447 11.2051 23.4292 10.4421 22.867 9.8792Z" fill="#000000" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_673_899">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <span className="text-xl font-semibold">Salir de la comunidad</span>
                            </div></> : <><div className="flex gap-3 items-center relative group ml-2 mt-2 mb-2">
                                <button className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <g clip-path="url(#clip0_673_899)">
                                            <path d="M11.476 15C11.2108 15 10.9564 15.1054 10.7689 15.2929C10.5814 15.4804 10.476 15.7348 10.476 16V19C10.476 19.7956 10.1599 20.5587 9.59732 21.1213C9.03471 21.6839 8.27165 22 7.476 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V5C2 4.20435 2.31607 3.44129 2.87868 2.87868C3.44129 2.31607 4.20435 2 5 2H7.476C8.27165 2 9.03471 2.31607 9.59732 2.87868C10.1599 3.44129 10.476 4.20435 10.476 5V8C10.476 8.26522 10.5814 8.51957 10.7689 8.70711C10.9564 8.89464 11.2108 9 11.476 9C11.7412 9 11.9956 8.89464 12.1831 8.70711C12.3706 8.51957 12.476 8.26522 12.476 8V5C12.4744 3.67441 11.9471 2.40356 11.0098 1.46622C10.0724 0.528882 8.80159 0.00158786 7.476 0H5C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 19C0.00158786 20.3256 0.528882 21.5964 1.46622 22.5338C2.40356 23.4711 3.67441 23.9984 5 24H7.476C8.80159 23.9984 10.0724 23.4711 11.0098 22.5338C11.9471 21.5964 12.4744 20.3256 12.476 19V16C12.476 15.7348 12.3706 15.4804 12.1831 15.2929C11.9956 15.1054 11.7412 15 11.476 15Z" fill="#000000" />
                                            <path d="M22.867 9.8792L18.281 5.2932C18.1888 5.19769 18.0784 5.12151 17.9564 5.0691C17.8344 5.01669 17.7032 4.98911 17.5704 4.98795C17.4376 4.9868 17.3059 5.0121 17.183 5.06238C17.0602 5.11266 16.9485 5.18692 16.8546 5.28081C16.7607 5.3747 16.6865 5.48635 16.6362 5.60925C16.5859 5.73215 16.5606 5.86383 16.5618 5.9966C16.5629 6.12938 16.5905 6.2606 16.6429 6.38261C16.6953 6.50461 16.7715 6.61496 16.867 6.7072L21.129 10.9702L6 11.0002C5.73478 11.0002 5.48043 11.1056 5.29289 11.2931C5.10536 11.4806 5 11.735 5 12.0002C5 12.2654 5.10536 12.5198 5.29289 12.7073C5.48043 12.8948 5.73478 13.0002 6 13.0002L21.188 12.9692L16.865 17.2932C16.7695 17.3855 16.6933 17.4958 16.6409 17.6178C16.5885 17.7398 16.5609 17.871 16.5598 18.0038C16.5586 18.1366 16.5839 18.2683 16.6342 18.3912C16.6845 18.5141 16.7587 18.6257 16.8526 18.7196C16.9465 18.8135 17.0582 18.8877 17.181 18.938C17.3039 18.9883 17.4356 19.0136 17.5684 19.0125C17.7012 19.0113 17.8324 18.9837 17.9544 18.9313C18.0764 18.8789 18.1868 18.8027 18.279 18.7072L22.865 14.1212C23.4277 13.5589 23.744 12.7961 23.7444 12.0006C23.7447 11.2051 23.4292 10.4421 22.867 9.8792Z" fill="#000000" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_673_899">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                                <span className="text-xl font-semibold">Salir del grupo</span>
                            </div>
                            </>}
                        </>
                        ) : <> <section className="grid gap-1 ml-2 mt-4">
                            <div className="flex gap-3 items-center relative group">
                                <button className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-9"><path d="M16.9057 5.68009L5.68009 16.9057C4.62644 15.5506 4 13.8491 4 12C4 7.58172 7.58172 4 12 4C13.8491 4 15.5506 4.62644 16.9057 5.68009ZM7.0943 18.3199L18.3199 7.0943C19.3736 8.44939 20 10.1509 20 12C20 16.4183 16.4183 20 12 20C10.1509 20 8.44939 19.3736 7.0943 18.3199ZM12 2C6.47715 2 2 6.47715 2 12C2 17.5223 6.47771 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47771 17.5223 2 12 2Z"></path>
                                    </svg>
                                </button>
                                <span className="text-xl font-semibold">Eliminar Amigo</span>
                            </div>
                            <div className="flex gap-3 items-center relative group">
                                <button className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM4 18.3851L5.76282 17H20V5H4V18.3851ZM13.4142 11L15.8891 13.4749L14.4749 14.8891L12 12.4142L9.52513 14.8891L8.11091 13.4749L10.5858 11L8.11091 8.52513L9.52513 7.11091L12 9.58579L14.4749 7.11091L15.8891 8.52513L13.4142 11Z"></path>
                                    </svg>
                                </button>
                                <span className="text-xl font-semibold">Vaciar chat</span>
                            </div>
                        </section>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
