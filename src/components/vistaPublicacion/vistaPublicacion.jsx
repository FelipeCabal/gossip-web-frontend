import { Link, useParams } from "react-router-dom";
import './vistaPublicacion.css'
import imagenEjemplo from "../../assets/avatares/neutro.png"
import anonimo from '../../assets/icons/Buho.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { FormComment } from "../Comentarios/FormComment";
import { Comentarios } from "../Comentarios/Comentarios";
import { useAuth } from "../../providers/AuthProvider";
import { useRefresh } from "../../providers/RefreshProvider";

export function VistaPublicacion() {
    const { post } = useParams()
    const { usuario } = useAuth()
    const [publicacion, setPublicacion] = useState(null);
    const endpoint = process.env.REACT_APP_API + "/posts/" + post
    const [likeIt, setLikeIt] = useState(false)
    const heartStroke = likeIt ? '#99b4ff' : 'currentColor'
    const heartFill = likeIt ? '#99b4ff' : 'none'
    const [likes, setLikes] = useState(null)
    const { refresh, setRefresh } = useRefresh();
    useEffect(() => {
        if (!usuario) {
            return
        }
        axios.get(endpoint)
            .then(res => {
                const data = res.data;
                setPublicacion(data)
            }).catch(e => console.log(e));
    }, [usuario]);
    useEffect(() => {
        if (!usuario) {
            return
        }
        axios.get(process.env.REACT_APP_API + "/likes/" + post)
            .then((respuesta) => {
                setLikes(respuesta.data)
                respuesta.data.map((like) => {
                    if (usuario.id == like.user.id) {
                        setLikeIt(true)
                    }
                })
            })
            .catch((error) => { console.log(error) })
    }, [likeIt, usuario])

    const currentPath = window.location.pathname
    const pathParts = currentPath.split('/');
    let pathDireccion = ''

    if (pathParts[1] == 'homepage') {
        pathDireccion = '/' + pathParts[1]
    } else {
        pathDireccion = '/' + pathParts[1] + '/' + pathParts[2]
    }

    const handleClick = () => {
        axios.post(process.env.REACT_APP_API + "/likes/" + post)
            .then(() => {
                setLikeIt(!likeIt)
                setRefresh(!refresh)
            })
            .catch((error) => { console.log(error) })
    };

    return <>
        {
            publicacion ? <div className="modal-fade animate__animated animate__fadeIn">
                <div className="modal-content animate__animated animate__slideInDown">
                    <div className="modal-header flex justify-between w-full">
                        <div className="flex items-center mb-4">
                            <img src={publicacion.user ? publicacion.user.imagen_perfil ? publicacion.user.imagen_perfil : imagenEjemplo : anonimo}
                                alt=""
                                className="max-w-full w-24 -mb-2"
                            />
                            <p className="font-bold">{publicacion.user ? publicacion.user.nombre : <span>Anonimo</span>}</p>
                        </div>
                        <Link to={pathDireccion} className="modal-closer">
                            <span className="material-symbols-outlined text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    <div className="text-lg sm:text-2xl">
                        <div className="w-full flex justify-center">
                            <img src={publicacion.imagen != '' ? publicacion.imagen : <></>} alt="" />
                        </div>
                        <div className="border-b-2 border-gray-300">
                            <p className={publicacion.imagen != '' ? 'mt-3' : 'text-center text-3xl mt-3'}>
                                {publicacion.description != '' ? publicacion.description : <></>}
                            </p>
                            <div className="flex gap-4 items-center mt-6 mb-5">
                                <button onClick={handleClick}>
                                    <svg
                                        data-slot="icon"
                                        fill={heartFill}
                                        height="27"
                                        strokeWidth="2"
                                        stroke={heartStroke}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z">
                                        </path>
                                    </svg>
                                </button>
                                {
                                    likes ?
                                        likes.length > 1 ?
                                            <p>Le gusta a {likes[0].user.nombre} y a {likes.length - 1} personas mas</p>
                                            : likeIt ? <p>Te gusta</p> : <p>a {likes[0].user.nombre} le gusta</p>
                                        : <p>Indica que te gusta</p>
                                }
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-center'>
                                <h3 className='border-t-2 mt-[-2px] border-black w-fit text-2xl'>Comentarios</h3>
                            </div>
                            <FormComment postid={post} />
                            <Comentarios postid={post} />
                        </div>
                    </div>
                </div>
            </div> : <></>
        }
    </>



}