import { useEffect, useState } from 'react';
import icono from '../assets/avatares/neutro.png';
import axios from 'axios';
import { useAuth } from '../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';


const Comunidades = () => {

    const endpoint = process.env.REACT_APP_API + "/chats/community";
    const [communities, setCommunities] = useState(null)
    const [myCommunities, setMyCommunities] = useState(null)
    const [actualizar, setActualizar] = useState(false)
    const { usuario } = useAuth()

    const unirse = (id) => {
        axios.post(endpoint + "/" + id + "/miembros")
            .then((r) => {
                toast.success("¡Te has unido a la comunidad exitosamente!");
                setActualizar(!actualizar);
            })
            .catch((error) => {
                toast.error("Hubo un error al intentar unirte a la comunidad.");
            });
    }

    useEffect(() => {
        if (!usuario) {
            return
        }
        axios.get(endpoint)
            .then((r) => {
                setCommunities(r.data)
            })
    }, [usuario])

    useEffect(() => {
        if (!usuario) {
            return
        }
        axios.get(endpoint + "/user/" + usuario.id)
            .then((r) => {
                setMyCommunities(r.data)
                console.log(r.data)
            })
    }, [usuario, actualizar])

    return <>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />

        {
            communities ? <>

                <div className="rounded-lg w-full mt-5">
                    <h2 className="text-2xl font-bold text-center mb-6">COMUNIDADES</h2>
                    <div className=" mt-1 w-full flex flex-col p-6">
                        {communities.filter((comunidad) => !myCommunities || !myCommunities.some((myCom) => myCom.comunidad.id == comunidad.id)).slice(0, 5).map((comunidad) => (
                            <div key={comunidad.id} className="flex items-center border-b-2 justify-between  border-b-[#918ef4] w-full h-[65px]">
                                <div className='flex justify-center items-center gap-2'>
                                    <img src={comunidad.imagen ? comunidad.imagen : icono} className="w-20 h-20 rounded-full object-cover" />
                                    <p className=" text-lg text-center text-[#4f98e6] font-bold flex-1 mr-3">{comunidad.nombre}</p>
                                </div>
                                <svg onClick={() => unirse(comunidad.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 cursor-pointer mr-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </>
                : <></>
        }
    </>
};

export default Comunidades;
