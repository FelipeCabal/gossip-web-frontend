import axios from "axios";
import { useState } from "react"
import { useRefresh } from "../../providers/RefreshProvider";

export function FormComment({ onClose, postid }) {
    const { setRefresh } = useRefresh();
    const ENDPOINT_COMMENTS = process.env.REACT_APP_API + '/posts/comments/' + postid
    const [comentario, setComentario] = useState('')

    const autoResize = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleChangeComment = (e) => {
        setComentario(e.target.value)
    }
    const handleSubmit = () => {
        if (comentario) {
            const data = {
                comentario: comentario
            }
            axios.post(ENDPOINT_COMMENTS, data)
                .then((respuesta) => {
                    setComentario('')
                    setRefresh(true)
                    if (onclose) {
                        onClose(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } else console.log('debe escribir algo')
    }
    return (
        <div className="p-3 flex gap-5 items-end">
            <textarea onInput={autoResize}
                className="w-full text-2xl p-1 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
                rows="1"
                placeholder="Escribe tu comentario..."
                value={comentario}
                onChange={handleChangeComment}
            ></textarea>

            <button
                className="btn btn-2 h-fit "
                onClick={handleSubmit}
            >
                Enviar
            </button>

        </div>
    );
}