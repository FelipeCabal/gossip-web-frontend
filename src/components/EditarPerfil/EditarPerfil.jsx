import { useState, useEffect } from 'react';
import axios from 'axios';

export function EditarPerfil() {
    const [profile, setProfile] = useState({
        name: '',
        password: '',
        pais: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Obtener datos del perfil cuando se monta el componente
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                // eslint-disable-next-line no-undef
                const response = await axios.get(process.env.REACT_APP_API + '/users/' + id); // Cambia por la ruta de tu API
                setProfile({
                    name: response.data.nombre,
                    password: response.data.password,
                    pais: response.data.pais
                });
            } catch (error) {
                console.log(error)
                setError('Error al cargar los datos del perfil.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            setSuccess('');

            // eslint-disable-next-line no-undef
            await axios.put(process.env.REACT_APP_API + '/users/' + id); // Cambia por la ruta de tu API
            setSuccess('Perfil actualizado correctamente.');
        } catch (error) {
            console.log(error)
            setError('Error al actualizar el perfil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Editar Perfil</h2>
            {loading && <p>Cargando...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Pais</label>
                    <input
                        type="text"
                        name="Pais"
                        value={profile.pais}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        placeholder="Dejar vacío para no cambiar"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
};
