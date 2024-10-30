import { useContext, useState } from "react";
import { ImagenPreview } from "../../partials/ImagenPreview/imagenPreview";
import { deleteFile, uploadFile } from "../../services/firebase-services";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRefresh } from "../../providers/RefreshProvider";

export function PostHomeForm({ context }) {
    const { setRefresh } = useRefresh();
    const navigate = useNavigate();
    const [isToggled, setIsToggled] = useState(false);
    const [postContent, setPostContent] = useState({
        description: '',
        imagen: '',
        esAnonimo: isToggled
    });
    const [asset, setAsset] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileExist, setFileExist] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!postContent.description && !asset) return;

        axios.post(`${process.env.REACT_APP_API}/posts`, postContent).then(() => {
            setIsToggled(false);
            setPostContent({ description: '', imagen: '', esAnonimo: false });
            setRefresh(true)
            setAsset(null);
            navigate('/homepage');
        }).catch(e => console.log(e));
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

    const handleChangeDescription = (e) => {
        setPostContent(prevContent => ({ ...prevContent, description: e.target.value }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/mpeg'];
        if (!validTypes.includes(file.type)) {
            alert("Solo se permiten imágenes o videos.");
            return;
        }

        const newAsset = {
            type: 'publicaciones',
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
                setPostContent(prevContent => ({ ...prevContent, imagen: url }));
                console.log("Image/Video URL updated:", url);
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsUploading(false);
            setFileExist(true);
        }
    };

    const handleToggle = () => {
        setIsToggled(!isToggled);
        setPostContent(prevContent => ({ ...prevContent, esAnonimo: !isToggled }));
    };

    const autoResize = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };
    const currentPath = window.location.pathname;
    return (
        <div className={currentPath == '/homepage/postForm' && context == 'modal' ? "w-11/12 bg-white rounded-lg shadow-md p-2 mb-3 mx-auto" : "w-11/12 bg-white rounded-lg shadow-md p-2 mb-3 mx-auto sm:w-2/4"} >
            <div className="flex justify-between items-center space-x-4 mb-4">
                <div className="flex items-center space-x-4">
                    <img
                        className="w-12 h-12 rounded-full"
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                    />
                    <h2 className="text-xl font-semibold">¿Qué estás pensando?</h2>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-xl font-semibold">Anónimo</h2>
                    <button
                        onClick={handleToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 focus:outline-none ${isToggled ? 'bg-green-500' : 'bg-gray-400'}`}
                    >
                        <div
                            className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${isToggled ? 'translate-x-6' : 'translate-x-0'}`}
                        />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full h-[50px] p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
                    placeholder="Escribe algo"
                    value={postContent.description}
                    onChange={handleChangeDescription}
                    onInput={autoResize}
                />
                {(!isUploading && asset) ? <ImagenPreview file={asset} handleDelete={handleDelete} /> :
                    asset && <div className="w-full flex items-center justify-center">
                        <img className="w-24 h-24" src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831" alt="loading..." />
                    </div>}
                <div className="flex justify-end items-center mt-2">
                    <input
                        type="file"
                        id={`file-upload-${context}`}
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*,video/*"
                        multiple={false}
                    />
                    {fileExist ? null : (
                        <>
                            <label
                                htmlFor={`file-upload-${context}`}
                                className='flex items-center py-2 px-4 rounded-lg cursor-pointer focus:outline-none hover:bg-slate-400'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </label>
                        </>
                    )}
                    <button
                        type="submit"
                        className="flex items-center py-2 px-4 rounded-lg hover:bg-blue-400 focus:outline-none"
                        onClick={handleSubmit}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
