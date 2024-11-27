import { useState, useEffect, } from 'react';
import axios from 'axios';
import icono from '../../assets/avatares/neutro.png';

export function EditarPerfil() {
    const [id, setId] = useState(null);
    const [profile, setProfile] = useState({
        name: '',
        password: '',
        pais: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchProfile = async () => {
        const userId = 'someUserId'; // Replace with actual user ID logic
        setId(userId);
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(process.env.REACT_APP_API + '/users/' + id);
                setProfile({
                    name: response.data.nombre,
                    password: response.data.password,
                    pais: response.data.pais
                });
            } catch (error) {
                console.log(error)
                setError('');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfile((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.patch(process.env.REACT_APP_API + '/users/' + id, profile);
            setSuccess('');

            await axios.patch(process.env.REACT_APP_API + '/users/' + id);
            setSuccess('Perfil actualizado correctamente.');
        } catch (error) {
            console.log(error)
            setError('Error al actualizar el perfil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mt-32 mx-auto p-6 bg-white rounded-lg ">
            <h2 className='text-center mb-16 font-bold'>Editar Perfil</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <div className="flex flex-col items-center mb-6 mx-auto">
                <img
                    src={profile.image || icono}
                    alt="foto de perfil"
                    className="w-52 rounded-full object-cover border mb-10"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div className='mt-10 border -mx-40 flex border-gray-300 rounded-lg shadow-md' >
                    <label className='mx-6 mt-4 font-bold'>Nombre:</label>
                    <input className='w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-purple-500'
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mt-10 border flex -mx-40 border-gray-300 rounded-lg shadow-md'>
                    <label className='mx-6 mt-4 font-bold'>Pais:</label>
                    <input className='w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-purple-500'
                        type="text"
                        name="pais"
                        value={profile.pais}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div class="mt-16 mb-16 py-6 space-x-10 flex -w-80">
                    <button className='btn btn-2 text-lg w-52' type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : 'Aceptar'}
                    </button>
                    <button className='btn btn-4 text-lg w-52' type="submit" disabled={loading}>
                        {loading ? 'Cancelando...' : 'Descartar'}
                    </button>
                </div>
            </form>
        </div>
    );
};
