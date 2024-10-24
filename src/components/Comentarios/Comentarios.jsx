import { CardComentario } from './CardComentario'

import mujer from '../../assets/avatares/mujer.png'
import hombre from '../../assets/avatares/hombre.png'
import neutro from '../../assets/avatares/neutro.png'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../providers/AuthProvider'

const lista = [
    {
        userName: 'Rulo Ricardo',
        texto: 'pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu pero mas bonito estas tu ',
        esAnonimo: false,
        perfil: mujer
    },
    {
        userName: 'Rulo Ronaldo',
        texto: 'mmmmm',
        esAnonimo: false,
        perfil: hombre
    },
    {
        userName: 'Carlos',
        texto: 'astetik*',
        esAnonimo: false,
        perfil: hombre
    },
    {
        userName: 'LaGatos',
        texto: 'a mi tambien me encantan los gatos',
        esAnonimo: false,
        perfil: mujer
    },
    {
        userName: 'taylor',
        texto: 'el huracan ya pasooo',
        esAnonimo: false,
        perfil: neutro
    },
    {
        userName: 'lucy',
        texto: 'la verdad no te entendi nada',
        esAnonimo: true,
        perfil: hombre
    }
]

export const Comentarios = () => {
    const ENDPOINT_COMMENTS = process.env.REACT_APP_API + '/comentarios'
    const { usuario } = useAuth()
    const [comments, setComments] = useState(null)


    useEffect(() => {
        axios.get(ENDPOINT_COMMENTS)
            .then((respuesta) => {
                setComments(respuesta.data)
            })
            .catch((error) => {
                console.log(error)
            })
    })


    return (
        <div className='flex flex-col gap-y-2'>
            {comments ?
                comments.map(({ comments, index }) => (
                    <CardComentario
                        key={index}
                        userName={comments.userName}
                        texto={comments.texto}
                        perfil={comments.perfil}
                    >
                    </CardComentario>
                )) : <></>
            }
        </div>
    )
}