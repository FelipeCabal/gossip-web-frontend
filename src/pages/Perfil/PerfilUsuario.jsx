import { useParams } from 'react-router-dom'
import neutro from '../../assets/avatares/neutro.png'
import { ListaPublicaciones } from '../../components/PublicacionesHome/ListaPublicaciones'
import { useAuth } from '../../providers/AuthProvider'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { WidthFull } from '@mui/icons-material'

export function PerfilUsuario() {
    const { usuario } = useAuth()
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/users/' + id)
            .then((respuesta) => {
                setUser(respuesta.data)
                console.log(respuesta.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [id])

    return (<>
        {
            user && usuario ?
                <div className="flex flex-col items-center ">
                    < section className='flex justify-between !xs:w-3/5 border-b-2 border-gray-300' style={{ maxwidth: '100%' }}>
                        <div>
                            <img src={user.imagen ? user.imagen : neutro} alt="perfil" className='w-80 ' />
                        </div>
                        <div>
                            <h2 className='font-semibold h-fit pt-10 '>
                                {user.nombre}
                            </h2>
                            <div className='grid'>
                                <span className='text-xl font-bold'>5 Publicaciones</span>
                                <span className='text-xl'>
                                    {user.pais}
                                </span>
                            </div>
                        </div>

                        <div className='flex  h-fit pt-10'>
                            <div >
                                {usuario.id == id ? (<div>
                                    <button className='btn btn-font-black border border-blue-500  text-black mr-4'>
                                        Editar perfil
                                    </button>
                                    <button className='btn btn-font-black border border-blue-500 text-black '>
                                        Solicitudes
                                    </button>
                                </div>) : (<div>
                                    <button className='btn btn-font-black border border-blue-500  text-black mr-4'>
                                        Añadir
                                    </button>
                                    <button className='btn btn-font-black border border-blue-500 text-black '>
                                        Enviar solicitud
                                    </button> </div>)}

                            </div>
                        </div>

                    </section >
                    <section className='w-full flex font-medium flex-col items-center'>
                        <div className='flex justify-center'>
                            <h3 className='border-t-2 mt-[-2px] border-black w-fit'>Publicaciones</h3>
                        </div>
                        <div className='w-full flex flex-col justify-center sm:w-10/12 md:w-3/4'>
                            <ListaPublicaciones></ListaPublicaciones>
                        </div>
                    </section>

                </div> : <></>
        }
    </>
    )
}
