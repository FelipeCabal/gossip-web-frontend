import { useState } from "react"
import { ImagenPreview } from "../../partials/ImagenPreview/imagenPreview"
import { deleteFile, uploadFile } from "../../services/firebase-services"
import axios from "axios"
import { useAuth } from "../../providers/AuthProvider"
import { useRefresh } from "../../providers/RefreshProvider"

export function CambiarFoto({ salir }) {
    const { usuario, getUsuario } = useAuth()
    const [eleccion, setEleccion] = useState(false)
    const [cambiar, setCambiar] = useState(false)
    const [eliminar, setEliminar] = useState(false)
    const [fileExist, setFileExist] = useState(false)
    const { refresh, setRefresh } = useRefresh()
    const [asset, setAsset] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [image, setImage] = useState('')

    const toggleButtonCambiarFoto = () => {
        setCambiar(!cambiar)
        setEleccion(!eleccion)
    }

    const toggleButtonEliminarFoto = () => {
        setEliminar(!eliminar)
        setEleccion(!eleccion)
    }

    const handleDelete = () => {

        const imagenVacia = {
            imagen: ''
        }

        if (asset != null) {
            try {
                deleteFile(asset)
            } catch {
                console.log("El archivo no pudo ser eliminado");
            } finally {
                setAsset(null);
                setFileExist(false);
                setEleccion(!eleccion)
                setCambiar(!cambiar)
            }
        } else {
            try {
                axios.patch(`${process.env.REACT_APP_API}/users/${usuario.id}`, imagenVacia)
                    .then(() => console.log(`sucefull, image has been delete`))
            } catch {
                console.log("El archivo no pudo ser eliminado");
            } finally {
                setAsset(null);
                setFileExist(false);
                setEleccion(!eleccion)
                setEliminar(!eliminar)
                setRefresh(true)
                getUsuario()
                salir()
            }
        }
    }

    const handleSubimt = () => {

        const imagenSend = {
            imagen: image
        }
        axios.patch(`${process.env.REACT_APP_API}/users/${usuario.id}`, imagenSend)
            .then(() => {
                setAsset(null);
                setFileExist(false);
                setEleccion(!eleccion)
                setCambiar(!cambiar)
                salir()
            })
    }

    const handleFileChange = async (e) => {
        toggleButtonCambiarFoto()
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
        if (!validTypes.includes(file.type)) {
            alert("Solo se permiten imágenes o videos.");
            return;
        }

        const newAsset = {
            type: 'user',
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
                setImage(url)
                console.log("Image/Video URL updated:", url);
            }
        } catch (error) {
            console.log("Upload error:", error);
        } finally {
            setIsUploading(false);
            setFileExist(true);
        }
    };

    return <>
        <div className="modal-fadeFoto animate__animated animate__fadeIn">
            <div className="modal-contentFoto animate__animated animate__slideInDown">
                <div className="flex justify-end w-full cursor-pointer">
                    <span className="material-symbols-outlined text-black" onClick={salir}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className="w-full h-full">
                    {
                        !eleccion ?
                            <div className="w-full h-full flex flex-col items-center justify-center gap-y-20 -mt-10">
                                <div className="w-full flex justify-center shadow-[0px_3px_0px_0px_rgba(0,0,0,0.3)]">
                                    <input
                                        type="file"
                                        id="changeImage"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*,video/*"
                                        multiple={false}
                                    />

                                    <label
                                        htmlFor={`changeImage`}
                                        className="w-full"
                                    >
                                        <p className="w-full text-violet-600 border-b-2 border-cyan-700 text-center cursor-pointer">
                                            Subir foto
                                        </p>
                                    </label>

                                </div>
                                <div className="w-full flex justify-center shadow-[0px_3px_0px_0px_rgba(0,0,0,0.3)]">
                                    <button className="w-full text-red-600 border-b-2 border-cyan-700" onClick={() => toggleButtonEliminarFoto()}>
                                        Eliminar foto
                                    </button>
                                </div>
                            </div>
                            : eliminar ? <>
                                <div className="w-full h-full flex flex-col text-center justify-center items-center -mt-24">
                                    <h3>Esta seguro de eliminar la foto de perfil?</h3>
                                    <div className="flex justify-center gap-5 mt-10">
                                        <button className="btn btn-3" onClick={() => handleDelete()}>
                                            Aceptar
                                        </button>
                                        <button className="btn btn-4" onClick={() => toggleButtonEliminarFoto()}>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </>
                                : cambiar ? !isUploading && asset ? <>
                                    <ImagenPreview file={asset} handleDelete={handleDelete} />
                                    <div className="flex justify-center gap-5 mt-10">
                                        <button className="btn btn-3" onClick={() => handleSubimt()}>
                                            Aceptar
                                        </button>
                                        <button className="btn btn-4" onClick={() => handleDelete()}>
                                            Cancelar
                                        </button>
                                    </div>
                                </> : <div className="w-full flex items-center justify-center">
                                    <img className="w-24 h-24" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="loading..." />
                                </div>
                                    : <></>
                    }
                </div>
            </div>
        </div>
    </>
}