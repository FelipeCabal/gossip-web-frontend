import { ListaPublicaciones } from "../../components/PublicacionesHome/ListaPublicaciones";

export function HomePage() {
    return (<>
        <div className="containerHome">
            <div className="content-left">

            </div>
            <div className="content-right">
                <ListaPublicaciones />
            </div>
        </div>

    </>
    )
}
