import Comunidades from "../../components/ComunidadesDesplegables";
import { ListaPublicaciones } from "../../components/PublicacionesHome/ListaPublicaciones";
import { PostHomeForm } from "../../components/postsHomeForm/postHomeForm";
import { Outlet } from "react-router-dom";

export function HomePage() {
    return (<>
        <div className="containerHome xs: pr-0 z-10 overflow-y-hidden h-full">
            <div className="left-column">
                <Comunidades />
            </div>
            <div className=" overflow-y-scroll h-full">

                <div className="right-column flex flex-col justify-center xs:pr-2 w-full">
                    <PostHomeForm />
                    <ListaPublicaciones ENDPOINT={process.env.REACT_APP_API + '/posts/'} />
                </div>
            </div>
        </div>
        <Outlet />
    </>
    )
}
