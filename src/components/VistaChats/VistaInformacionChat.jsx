import { useAuth } from "../../providers/AuthProvider"
import foto from '../../assets/avatares/mujer.png'
import { Link } from "react-router-dom"



const chatType = "group"
const miembros = [
    {
        id: 1,
        nombre: "felipe",
        imagen_perfil: foto,
    },
    {
        id: 2,
        nombre: "nath",
        imagen_perfil: null,
    }
]

const usuario = {
    id: 1,
    nombre: "BuhitoSilencioso",
    imagen_perfil: foto,
}

export function VistaInformacionChat() {
    return (
        <>
            <div className="w-[290px]">
                <div className="h-screen !xs:h-full !xs:pr-4 sm:bg-[#E7E7E7] !xs:mt-4 !xs:m-[16px] !xs:bg-fuchsia-50 ">
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
                                <img src={usuario.imagen_perfil} alt="perfil" className="h-[90px] w-[90px]" />
                            </div>
                            <h3 className="flex justify-center font-medium">{usuario.nombre}</h3>
                        </div>
                        <div className="flex  justify-evenly mt-5 mb-4">
                            <div className="flex flex-col items-center relative group">
                                <Link to={`/perfil/${usuario.id}`} className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
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
                            <div className="flex flex-col items-center relative group">
                                <button className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 22 22"
                                        strokeWidth={1.8} stroke="currentColor"
                                        className="size-9">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                </button>
                                <span className="text-2xl font-semibold">Silenciar</span>
                            </div>
                        </div>
                    </section>
                    <section className="border-b-2 border-[#ABABAB]">
                        <h3 className="text-2xl font-semibold ml-3 mt-2">Archivos compartidos</h3>
                        <div className=" flex gap-4 ml-3 mt-3 mb-4">
                            <img src="https://i.pinimg.com/736x/cb/2c/74/cb2c74dbf4a73674f2d2cd87c3f7ccd2.jpg" alt="imagen compartida" className="w-[64px] h-[64px] rounded-3xl" />
                            <img src="https://i.pinimg.com/736x/5e/fa/ea/5efaeababb2e319be8d5d7f6ea61f5fe.jpg" alt="imagen compartida" className="w-[64px] h-[64px] rounded-3xl" />
                            <img src="https://i.pinimg.com/736x/84/e5/6f/84e56fa89585cdaff7d828406b957f52.jpg" alt="imagen compartida" className="w-[64px] h-[64px] rounded-3xl" />
                        </div>
                    </section>
                    {miembros.length > 0 ? (
                        <div className="border-b-2 border-[#ABABAB]">
                            <h3 className="text-2xl font-medium ml-3">Integrantes</h3>
                            {miembros.map((miembro) => (
                                <div key={miembro.id} className="flex gap-2 ml-3 mt-2 mb-4 items-center border-none">
                                    <img src={miembro.imagen_perfil} alt="" className="h-12 w-12 rounded-full border-none" />
                                    <span className="flex text-xl font-semibold items-center justify-center ">{miembro.nombre}</span>
                                </div>
                            ))}
                        </div>
                    ) : <> </>
                    }


                    <section className="grid gap-1 ml-2 mt-4">
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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path>
                                </svg>
                            </button>
                            <span className="text-xl font-semibold">Eliminar chat</span>
                        </div>
                        <div className="flex gap-3 items-center relative group">
                            <button className=" transition-transform transform group-hover:-translate-x-1 group-hover:-translate-y-1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM4 18.3851L5.76282 17H20V5H4V18.3851ZM13.4142 11L15.8891 13.4749L14.4749 14.8891L12 12.4142L9.52513 14.8891L8.11091 13.4749L10.5858 11L8.11091 8.52513L9.52513 7.11091L12 9.58579L14.4749 7.11091L15.8891 8.52513L13.4142 11Z"></path>
                                </svg>
                            </button>
                            <span className="text-xl font-semibold">Vaciar chat</span>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
