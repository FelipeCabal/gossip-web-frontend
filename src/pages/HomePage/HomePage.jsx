import { ListaPublicaciones } from "../../components/PublicacionesHome/ListaPublicaciones";
import { PostHomeForm } from "../../components/postsHomeForm/postHomeForm";
import { Outlet } from "react-router-dom";

export function HomePage() {
    return (<>
        <div className="containerHome xs: pr-0 z-10">
            <div className="left-column">
                holaaaa este es la parte de las comunidades
            </div>
            <div className="right-column flex flex-col justify-center xs:pr-2 w-full">
                <PostHomeForm />
                <ListaPublicaciones />
            </div>
        </div>
        <Outlet />
    </>
    )
}
