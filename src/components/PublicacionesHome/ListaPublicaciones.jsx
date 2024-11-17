import { PublicacionHome } from "./PublicacionHome"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRefresh } from "../../providers/RefreshProvider"
import { ConstructionOutlined } from "@mui/icons-material"

export const ListaPublicaciones = ({ENDPOINT}) => {
    const { refresh, setRefresh } = useRefresh();
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        axios.get(ENDPOINT)
            .then((respuesta) => {
                setPosts(respuesta.data)
                console.log(respuesta.data)
                setRefresh(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [refresh, setRefresh])
     

    return (<>
        <section className="w-full">
            {posts ? <>{
                posts.map((publicaciones, index) => {
                    return <PublicacionHome
                        key={index}
                        postId={publicaciones.id}
                        img={publicaciones.imagen}
                        userName={publicaciones.user ? publicaciones.user.nombre : null}
                        perfil={publicaciones.user ? publicaciones.user.imagen_perfil : null}
                        texto={publicaciones.description}
                        esAnonimo={publicaciones.esAnonimo}
                    >
                    </PublicacionHome>
                })}
            </> : <></>
            }
        </section >
    </>
    )
}
