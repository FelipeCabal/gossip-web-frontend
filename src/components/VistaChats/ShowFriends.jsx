import { useEffect, useState } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import './ShowFriends.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export function ShowFriends({ salir }) {
    const { id } = useParams()
    const { usuario } = useAuth()
    const [friends, setFriends] = useState(null)

    const sendInvitation = (userId) => {
        const endpoint = `${process.env.REACT_APP_API}/chats/group-invitation/${id}/send/${userId}`
        axios.post(endpoint)
            .then((r) => {
                toast.success("¡Invitación enviada!");
            })
            .catch((error) => {
                toast.error("Hubo un error al intentar enviar la invitación.");
            });
    }
    useEffect(() => {
        if (!usuario) {
            return
        }
        const ENDPOINT = process.env.REACT_APP_API + "/users/" + usuario.id + "/friends"
        axios.get(ENDPOINT)
            .then((r) => {
                setFriends(r.data)
            })
    }, [usuario])
    return <>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />

        <div className="modal-fadeFriends">
            <div className="modal-contentFriends h-[60%]" >
                <div className="flex justify-end w-full cursor-pointer">
                    <span className="material-symbols-outlined text-black" onClick={() => salir()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className='w-full h-full flex justify-center items-start'>
                    {
                        friends ? <ul className='list-none m-0 p-0 overflow-y-auto'>
                            {
                                friends.map((friend) => {
                                    return <li className='flex justify-between gap-6 items-center list-none m-0 border-b-2 p-2 border-blue-400' key={friend.user.id}>
                                        <div className='flex gap-2 items-center'>
                                            <img src={friend.user.imagen ? friend.user.imagen : ""} alt=""
                                                className='w-20 h-20 rounded-full'
                                            />
                                            <p>{friend.user.nombre}</p>
                                        </div>
                                        <button onClick={() => sendInvitation(friend.user.id)} className='btn btn-3 w-auto h-12'>
                                            invitar
                                        </button>
                                    </li>
                                })
                            }

                        </ul>
                            : <><h1>No tienes amigos para invitar</h1></>
                    }
                </div>
            </div>
        </div>

    </>
}