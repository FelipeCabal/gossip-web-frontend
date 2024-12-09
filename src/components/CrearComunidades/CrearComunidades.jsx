import React, { useState } from "react";
import { uploadFile, deleteFile } from "../../services/firebase-services"; // Ajusta según tu estructura
import { ImagenPreview } from "../../partials/ImagenPreview/imagenPreview"; // Ajusta según tu estructura

const CrearComunidadModal = ({ onClose }) => {
    const [communityName, setCommunityName] = useState("");
    const [communityDescription, setCommunityDescription] = useState("");
    const [asset, setAsset] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileExist, setFileExist] = useState(false);

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
            url: URL.createObjectURL(file), // Vista previa local
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
                console.log("Image URL updated:", url);
            }
        } catch (error) {
            console.log("Upload error:", error);
        } finally {
            setIsUploading(false);
            setFileExist(true);
        }
    };

    const handleDelete = () => {
        try {
            deleteFile(asset);
        } catch {
            console.log("El archivo no pudo ser eliminado");
        } finally {
            setAsset(null);
            setFileExist(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();


        console.log("Comunidad creada:", {
            communityName,
            communityDescription,
            asset,
        });
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

                <div className="flex justify-center">
                    <h2 className="text-5xl font-semibold text-gray-800 mb-12">Crear comunidad</h2>
                </div>

                <div className="mt-10 flex border-gray-300 rounded-lg shadow-md">
                    <label htmlFor="community-name" className="mx-6 mt-4 font-bold">
                        Nombre de la comunidad:
                    </label>
                    <input
                        type="text"
                        id="community-name"
                        value={communityName}
                        onChange={(e) => setCommunityName(e.target.value)}
                        placeholder="La Comunidad del pan"
                        className="w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-blue-500"
                    />
                </div>

                <div className="mt-10 flex border-gray-300 rounded-lg shadow-md">
                    <label htmlFor="community-description" className="mx-6 mt-4 font-bold">
                        Descripción:
                    </label>
                    <input
                        type="text"
                        id="community-description"
                        value={communityDescription}
                        onChange={(e) => setCommunityDescription(e.target.value)}
                        placeholder="Aquí solo hablamos de pan"
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

                    {(!isUploading && asset) ? (
                        <ImagenPreview file={asset} handleDelete={handleDelete} />
                    ) : (
                        asset && (
                            <div className="w-full flex items-center justify-center">
                                <img
                                    className="w-24 h-24"
                                    src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
                                    alt="Cargando..."
                                />
                            </div>
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
                        className="px-4 py-2 btn btn-4 text-white text-sm font-medium rounded-md hover:bg-red-600"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CrearComunidadModal;
