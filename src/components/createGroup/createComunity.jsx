import { Link } from "react-router-dom";
import "./createGroup.css";
import { useState } from "react";
import axios from "axios";

export function CreateComunity() {
    const endpoint_group = process.env.REACT_APP_API + "/chats/community";

    // Estados locales para el formulario
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);

    // Convertir el archivo a Base64
    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Manejar el envío de datos
    const handleAccept = async (e) => {
        e.preventDefault();

        if (!groupName || !description) {
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        try {
            // Convertir la imagen a Base64 (si existe)
            let imageBase64 = null;
            if (file) {
                imageBase64 = await fileToBase64(file);
            }

            // Crear el objeto de datos
            const groupData = {
                nombre: groupName.trim(),
                descripcion: description.trim(),
                imagen: imageBase64,
            };

            console.log("Datos enviados:", groupData); // Verificar el objeto en consola

            // Realizar la petición POST con Axios
            const response = await axios.post(endpoint_group, groupData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });


        }
        catch (error) {
            console.error("Error en la petición:", error);
            alert("Hubo un problema con la solicitud.");
        }
    };

    // Manejar la cancelación (limpiar el formulario)
    const handleCancel = () => {
        setGroupName("");
        setDescription("");
        setFile(null);
    };

    return (
        <>
            <div className="modal-fade">
                <div className="modal-content">
                    <Link to={"/homepage"} className="modal-closer flex justify-end">
                        <span className="material-symbols-outlined text-black">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-9"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </span>
                    </Link>
                    <div className="modal-header flex items-center justify-center font-bold text-[28px]">
                        Crear comunidad
                    </div>
                    <div className="w-full mx-auto bg-white rounded-md p-4">
                        <form className="mb-10">
                            <div className="mb-4 shadow-sm border-b-2 border-[#306BAC] relative">
                                <label
                                    htmlFor="community-name"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Nombre de la comunidad:
                                </label>
                                <input
                                    type="text"
                                    id="community-name"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="Escribir nombre"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4 shadow-sm border-b-2 border-[#306BAC] relative">
                                <label
                                    htmlFor="description"
                                    className="block text-gray-700 font-medium mb-1"
                                >
                                    Descripción:
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Descripción"
                                    rows="3"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                ></textarea>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer w-full bg-none text-black border-[2px] border-[#306BAC] py-2 px-4 rounded-[10px] text-center hover:bg-[#98b9f2] focus:outline-none"
                                >
                                    Cargar imagen
                                </label>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="flex space-x-[100px] justify-center">
                        <button
                            className="btn btn-5"
                            onClick={handleAccept}
                        >
                            Aceptar
                        </button>
                        <button
                            className="btn btn-4"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
