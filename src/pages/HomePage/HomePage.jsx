import { PostAdd } from "@mui/icons-material";
import { ListaPublicaciones } from "../../components/PublicacionesHome/ListaPublicaciones";
import { PostHomeForm } from "../../components/postsHomeForm/postHomeForm";

export function HomePage() {
    return (<>
        <div className="containerHome xs: pr-0">
            <div className="left-column">
                holaaaa este es la parte de las comunidades
            </div>
            <div className="right-column grid justify-center xs: pr-2">
                <PostHomeForm/>
                <ListaPublicaciones />
            </div>
        </div>

    </>
    )
}
