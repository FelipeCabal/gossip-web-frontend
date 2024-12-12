import { PublicacionHome } from "./PublicacionHome"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRefresh } from "../../providers/RefreshProvider"
import { useAuth } from "../../providers/AuthProvider"

export const ListaPublicaciones = ({ ENDPOINT }) => {
    const { usuario } = useAuth()
    const { refresh, setRefresh } = useRefresh();
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        if (!usuario) {
            return
        }
        axios.get(ENDPOINT)
            .then((respuesta) => {
                setPosts(respuesta.data)
                setRefresh(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh, setRefresh, ENDPOINT, usuario])


    return (<>
        <section className="w-full">
            {posts ? <>{
                posts.map((publicaciones, index) => {
                    return <PublicacionHome
                        key={index}
                        postId={publicaciones.id}
                        img={publicaciones.imagen}
                        userName={publicaciones.user ? publicaciones.user.nombre : null}
                        perfil={publicaciones.user ? publicaciones.user.imagen : null}
                        texto={publicaciones.description}
                        esAnonimo={publicaciones.esAnonimo}
                    >
                    </PublicacionHome>
                })}
            </> : <div className="flex items-center justify-center font-medium text-2xl">No hay publicaciones disponibles</div>
            }
        </section >
    </>
    )
}
