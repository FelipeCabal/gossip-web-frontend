import { Outlet, useParams } from 'react-router-dom';
import neutro from '../../assets/avatares/neutro.png';
import { ListaPublicaciones } from '../../components/PublicacionesHome/ListaPublicaciones';
import { ListaLikes } from '../../components/LikesUsuarios/LikesUsuario';
import { useAuth } from '../../providers/AuthProvider';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function PerfilUsuario() {
    const { usuario } = useAuth();
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("publicaciones"); // Nueva variable de estado para tabs

    useEffect(() => {
        // eslint-disable-next-line no-undef
        axios.get(process.env.REACT_APP_API + '/users/' + id)
            .then((respuesta) => {
                setUser(respuesta.data);
            })
            .catch((error) => {
                console.log("este es el error" + error);
            });
    }, [id]);
    return (
        <>
            {
                user && usuario ? (
                    <div className='h-full'>
                        <div className="flex flex-col items-center pb-[100px] overflow-y-auto max-h-full">
                            <section className="flex justify-between !xs:w-3/5 border-b-2 border-gray-300 pb-10 mt-6" style={{ maxwidth: '100%' }}>
                                <div className="mr-12 flex items-center">
                                    <img src={user.imagen ? user.imagen : neutro} alt="perfil" className="h-20 w-20 rounded-full object-cover border-4 border-[#306bac] sm:w-80 sm:h-80" />
                                </div>
                                <div className="mr-12 w-auto">
                                    <h2 className="font-semibold h-fit pt-10">
                                        {user.nombre}
                                    </h2>
                                    <div className="grid">
                                        <span className="text-xl font-bold">5 Publicaciones</span>
                                        <span className="text-xl">
                                            {user.pais}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex h-fit pt-10">
                                    <div className="flex sm:flex-col">
                                        {usuario.id == id ? (
                                            <div>
                                                <Link to={`/update`}>
                                                    <button className="btn btn-font-black border border-blue-500 text-black mr-4">
                                                        Editar perfil
                                                    </button>
                                                </Link>
                                                <button className="btn btn-font-black border border-blue-500 text-black">
                                                    Solicitudes
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button className="btn btn-font-black border border-blue-500 text-black mr-4">
                                                    Añadir
                                                </button>
                                                <button className="btn btn-font-black border border-blue-500 text-black">
                                                    Enviar solicitud
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>
                            <section className="w-full flex font-medium flex-col items-center">
                                <div className="flex justify-center space-x-10">
                                    {/* Tabs de navegación */}
                                    <h3
                                        className={`cursor-pointer ${activeTab === "publicaciones" ? "border-t-2 border-black" : ""}`}
                                        onClick={() => setActiveTab("publicaciones")}
                                    >
                                        Publicaciones
                                    </h3>
                                    <h3
                                        className={`cursor-pointer ${activeTab === "likes" ? "border-t-2 border-black" : ""}`}
                                        onClick={() => setActiveTab("likes")}
                                    >
                                        Likes
                                    </h3>
                                </div>
                                <div className="w-full flex flex-col justify-center sm:w-10/12 md:w-3/4">
                                    {/* Renderizar contenido basado en la pestaña activa */}
                                    {activeTab === "publicaciones" ? (
                                        <ListaPublicaciones ENDPOINT={process.env.REACT_APP_API + '/posts/user/' + id} />
                                    ) : (
                                        <ListaLikes ENDPOINT={process.env.REACT_APP_API + '/posts/likes/' + id} />
                                    )}
                                </div>
                            </section>
                            <Outlet />
                        </div>
                    </div>
                )
                    : (
                        <>No se encontró información del usuario</>
                    )
            }
        </>
    );

}
