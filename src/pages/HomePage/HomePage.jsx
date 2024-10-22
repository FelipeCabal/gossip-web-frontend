import { ListaPublicaciones } from "../../components/PublicacionesHome/ListaPublicaciones";

export function HomePage() {
    return (<>
        <div className="containerHome xs: pr-0">
            <div className=" left-column xs: block">
                holaaaa este es la parte de las comunidades
            </div>
            <div className="right-column xs: pr-2">
                <ListaPublicaciones/>
            </div>
        </div>

    </>
    )
}
