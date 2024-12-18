import { PublicacionHome } from "../PublicacionesHome/PublicacionHome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRefresh } from "../../providers/RefreshProvider";
import { useAuth } from "../../providers/AuthProvider";

export const ListaLikes = () => {
    const { usuario } = useAuth();
    const { refresh, setRefresh } = useRefresh();
    const [likes, setLikes] = useState(null);

    useEffect(() => {
        if (!usuario) {
            return;
        }
        const ENDPOINT = `${process.env.REACT_APP_API}/likes/user/${usuario.id}`;
        axios.get(ENDPOINT)
            .then((respuesta) => {
                setLikes(respuesta.data);
                setRefresh(false);
            })
            .catch((error) => {
                console.error("Error al obtener likes:", error);
            });
    }, [refresh, setRefresh, usuario]);

    return (
        <>
            <section className="w-full">
                {likes ? (
                    <>
                        {likes.map((like, index) => (
                            <PublicacionHome
                                key={index}
                                postId={like.post.id}
                                img={like.post.imagen}
                                userName={like.post.user ? like.post.user.nombre : null}
                                perfil={like.post.user ? like.post.user.imagen_perfil : null}
                                texto={like.post.description}
                                esAnonimo={like.post.esAnonimo}
                            />
                        ))}
                    </>
                ) : (
                    <div className="flex items-center justify-center font-medium text-2xl">
                        No hay publicaciones con likes disponibles
                    </div>
                )}
            </section>
        </>
    );
};
