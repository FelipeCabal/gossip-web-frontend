import { useParams } from 'react-router-dom'
import neutro from '../../assets/avatares/neutro.png'
import { ListaPublicaciones } from '../../components/PublicacionesHome/ListaPublicaciones'
import { useAuth } from '../../providers/AuthProvider'

export function PerfilUsuario() {
    const { usuario } = useAuth()
    /*const { idUsuario } = usuario.id
    const { id } = useParams()*/

    return (
        <div className="flex flex-col items-center ">
            <section className='flex justify-between w-3/5 border-b-2 border-gray-300'>
                <div>
                    <img src={neutro} alt="perfil" className='w-96' />
                </div>
                <div>
                    <h2 className='font-semibold h-fit pt-10 '>
                        {/*usuario.nombre*/}
                        BuhitoChismoso
                    </h2>
                    <div className='grid'>
                        <span className='text-xl font-bold'>5 Publicaciones</span>
                        <span className='text-xl'>
                            {/*usuario.descripcion*/}
                            mi novia mi religión <br />
                            #teamMinovia <br />
                            solo gente fiel
                        </span>
                    </div>
                </div>

                <div className='flex  h-fit pt-10'>
                    <div>
                        {/*idUsuario == id ? (<div>
                            <button className='btn  border border-blue-500  text-black mr-4'>
                                Editar perfil
                            </button>
                            <button className='btn  border border-blue-500 text-black '>
                                Solicitudes
                            </button>
                        </div>) : (<div>
                            <button className='btn  border border-blue-500  text-black mr-4'>
                                Añadir
                            </button>
                            <button className='btn  border border-blue-500 text-black '>
                                Enviar solicitud
                            </button> </div>)*/}
                        <button className='btn  border border-blue-500  text-black mr-4'>
                            Editar perfil
                        </button>
                        <button className='btn  border border-blue-500 text-black '>
                            Solicitudes
                        </button>
                    </div>
                </div>

            </section>
            <section className='flex justify-center font-medium flex-col '>
                <div className='flex justify-center'>
                    <h3 className='border-t-2 mt-[-2px] border-black w-fit'>Publicaciones</h3>
                </div>
                <div className=''>
                    <ListaPublicaciones></ListaPublicaciones>
                </div>
            </section>

        </div>
    )
}
