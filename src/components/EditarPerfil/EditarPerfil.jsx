import { useState, useEffect, } from 'react';
import axios from 'axios';
import icono from '../../assets/avatares/neutro.png';
import { useAuth } from '../../providers/AuthProvider';
import { deleteFile, uploadFile } from "../../services/firebase-services";
import { VerFoto } from './VerFoto';
import { CambiarFoto } from './CambiarFoto';

export function EditarPerfil() {
    const { usuario } = useAuth()
    const [user, setUser] = useState(usuario || {});
    const [loading, setLoading] = useState(false);
    const [verFoto, setVerFoto] = useState(false)
    const [cambiarFoto, setCambiarFoto] = useState(false)

    useEffect(() => {
        if (!usuario) {
            return
        }
        setUser(usuario)
    }, [usuario, user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (user != usuario) {
                await axios.patch(process.env.REACT_APP_API + '/users/' + usuario.id, user);
            } else (
                console.log('No has realizado ningun cambio')
            )
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const toggleVerFoto = () => {
        setVerFoto(!verFoto)
    }
    const toggleCambiarFoto = () => {
        setCambiarFoto(!cambiarFoto)
    }


    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg ">
            <h2 className='text-center mb-16 font-bold'>Editar Perfil</h2>
            {loading && <p>Cargando...</p>}
            <div className='flex justify-center'>
                <div className="mb-6 mx-auto relative group">
                    <img
                        src={user.imagen || icono}
                        alt="foto de perfil"
                        className="w-52 h-52 rounded-full object-cover border-4 border-sky-700 mb-10  group-hover:brightness-50"
                    />
                    <div className="absolute -mt-10 inset-0 flex flex-col gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out top-0">
                        <button onClick={() => toggleCambiarFoto()} className="bg-opacity-70 text-white rounded hover:bg-opacity-90">Cambiar</button>
                        <button onClick={() => toggleVerFoto()} className="bg-opacity-70 text-white rounded hover:bg-opacity-90">Ver foto</button>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='mt-10 border -mx-40 flex border-gray-300 rounded-lg shadow-md' >
                    <label className='mx-6 mt-4 font-bold'>Nombre:</label>
                    <input className='w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-purple-500'
                        type="text"
                        name="name"
                        value={user.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mt-10 border flex -mx-40 border-gray-300 rounded-lg shadow-md'>
                    <label className='mx-6 mt-4 font-bold'>Pais:</label>
                    <input className='w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-purple-500'
                        type="text"
                        name="pais"
                        value={user.pais}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mt-16 mb-16 py-6 space-x-10 flex -w-80">
                    <button className='btn btn-2 text-lg w-52' type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Aceptar'}
                    </button>
                    <button className='btn btn-4 text-lg w-52' type="submit" disabled={loading}>
                        {loading ? 'Cancelando...' : 'Descartar'}
                    </button>
                </div>
            </form>
            {
                verFoto ? <VerFoto salir={toggleVerFoto} foto={user.imagen || icono} /> : <></>
            }
            {
                cambiarFoto ? <CambiarFoto salir={toggleCambiarFoto} /> : <></>
            }
        </div>
    );
};
