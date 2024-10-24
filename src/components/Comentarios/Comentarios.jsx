import { CardComentario } from './CardComentario'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../providers/AuthProvider'
import { useRefresh } from '../../providers/RefreshProvider'


export const Comentarios = ({ postid }) => {
    const { refresh, setRefresh } = useRefresh();
    const ENDPOINT_COMMENTS = process.env.REACT_APP_API + '/posts/comments/' + postid
    const { usuario } = useAuth()
    const [comments, setComments] = useState(null)


    useEffect(() => {
        axios.get(ENDPOINT_COMMENTS)
            .then((respuesta) => {
                setComments(respuesta.data)
                setRefresh(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh, setRefresh])


    return (
        <div className='flex flex-col gap-y-2 mt-5'>
            {comments ?
                comments.map((comment, index) => {
                    return <CardComentario
                        key={index}
                        userName={comment.usuario ? comment.usuario.nombre : null}
                        texto={comment.textoComentario}
                        perfil={comment.usuario ? comment.usuario.imagenPerfil : null}
                    >
                    </CardComentario>
                }) : <></>
            }
        </div>
    )
}