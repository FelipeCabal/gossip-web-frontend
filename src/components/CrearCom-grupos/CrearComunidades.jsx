import React, { useState } from "react";
import axios from "axios"; // Importar Axios
import { uploadFile, deleteFile } from "../../services/firebase-services";
import { ImagenPreview } from "../../partials/ImagenPreview/imagenPreview";
import { useAuth } from '../../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const CrearComunidadModal = ({ onClose }) => {
    const [communityInfo, setCommunityInfo] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
    });
    const [asset, setAsset] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileExist, setFileExist] = useState(false);
    const { usuario } = useAuth()
    const navigate = useNavigate()

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            alert("Solo se permiten imágenes.");
            return;
        }

        const newAsset = {
            type: 'comunidades',
            name: file.name,
            url: URL.createObjectURL(file),
            file,
        };

        setAsset(newAsset);
        setIsUploading(true);

        try {
            const url = await uploadFile(newAsset, (percentage) => {
                if (percentage === 100) {
                    console.log("Upload complete for:", newAsset);
                }
            });
            if (url) {
                setCommunityInfo((prev) => ({ ...prev, imagen: url }));
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
            setFileExist(true);
        }
    };


    const showSucess = () => toast.success("Comunidad creada correctamente", {
        onClose: () => {
            navigate(`/chats/comunnity/user/${usuario.id}`);
        },
        autoClose: 2000,
    });

    const showError = () => toast.error("¿que tan bruto hay que ser para no saber que no se pudo crear?")

    const handleDelete = () => {
        try {
            deleteFile(asset);
        } catch {
            console.error("El archivo no pudo ser eliminado");
        } finally {
            setAsset(null);
            setFileExist(false);
            setCommunityInfo((prev) => ({ ...prev, imagen: '' }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommunityInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!communityInfo.nombre || !communityInfo.descripcion) return;

        axios
            .post(`${process.env.REACT_APP_API}/chats/community`, communityInfo)
            .then(() => {
                console.log("Comunidad creada:", communityInfo);
                setCommunityInfo({ nombre: '', descripcion: '', imagen: '' });
                setAsset(null);
                showSucess();
            })
            .catch((e) => console.error(e));

    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-3xl shadow-lg w-11/12 md:w-11/12 lg:w-3/4 xl:w-2/3 max-h-[80vh] overflow-y-auto p-6 relative">
                {/* Botón de cierre */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    ✖
                </button>

                <h2 className="text-5xl font-semibold text-gray-800 mb-12 text-center">
                    Crear comunidad
                </h2>

                <div className="mt-10 flex border-gray-300 rounded-lg shadow-md">
                    <label htmlFor="nombre" className="mx-6 mt-4 font-bold">
                        Nombre de la comunidad:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={communityInfo.nombre}
                        onChange={handleChange}
                        placeholder="....."
                        className="w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-blue-500"
                    />
                </div>

                <div className="mt-10 flex border-gray-300 rounded-lg shadow-md">
                    <label htmlFor="descripcion" className="mx-6 mt-4 font-bold">
                        Descripción:
                    </label>
                    <input
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        value={communityInfo.descripcion}
                        onChange={handleChange}
                        placeholder="....."
                        className="w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-blue-500"
                    />
                </div>

                <div className="mt-6">
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                    <label
                        htmlFor="fileInput"
                        className="w-full text-center py-6 px-4 bg-white rounded-md text-sm text-gray-600 hover:bg-gray-300 mb-4 cursor-pointer border-2 border-blue-500"
                    >
                        {fileExist ? "Cambiar imagen" : "Cargar imagen"}
                    </label>

                    {asset && (
                        isUploading ? (
                            <div className="w-full flex items-center justify-center">
                                <img
                                    className="w-24 h-24"
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                                    alt="Cargando..."
                                />
                            </div>
                        ) : (
                            <ImagenPreview file={asset} handleDelete={handleDelete} />
                        )
                    )}
                </div>

                <div className="flex justify-center space-x-28 mt-10">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-4 py-2 btn btn-2 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                    >
                        Aceptar
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 btn btn-4 text-white text-sm font-medium rounded-md hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
            />
        </div>

    );
};

export default CrearComunidadModal;
