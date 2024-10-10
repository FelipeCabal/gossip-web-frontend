import { PublicacionHome } from "./PublicacionHome"
import mujer from '../../assets/avatares/mujer.png'
import hombre from '../../assets/avatares/hombre.png'
import neutro from '../../assets/avatares/neutro.png'


const publicaciones = [
    {
        userName: 'Rulo Ricardo',
        img: 'https://i.pinimg.com/enabled_hi/564x/2c/6b/29/2c6b29c44f3d419764ba812183808322.jpg',
        texto: 'Bonito Paisaje',
        esAnonimo: false,
        perfil: mujer 
    },
    {
        userName: 'Rulo Ronaldo',
        img: 'https://i.pinimg.com/enabled_hi/564x/b4/59/3a/b4593a1cadeb6d97fe68b4efef3173c1.jpg',
        texto: 'Patas',
        esAnonimo: false,
        perfil: hombre 
    },
    {
        userName: 'Carlos',
        img: 'https://i.pinimg.com/enabled_hi/564x/8b/ec/c7/8becc728a7cb5158329e7fc7c0a062b0.jpg',
        texto: 'esteril',
        esAnonimo: false,
        perfil: hombre
    },
    {
        userName: 'LaGatos',
        img: 'https://i.pinimg.com/enabled_hi/564x/7d/a3/fb/7da3fb3c9c7f3587cfaa24d62165d2e7.jpg',
        texto: 'Me encantas los gatos',
        esAnonimo: false,
        perfil: mujer
    },
    {
        userName: 'taylor',
        texto: "La llegada del huracán Milton mantiene en alerta a las autoridades de Estados Unidos; los procesos de evacuación han generado grandes aglomeraciones de personas que buscan ponerse a salvo antes las inclemencias del clima El desplazamiento del huracán es seguido por las autoridades meteorológicas y los grupos de emergencia del país norteamericano, ante la amenaza que representa para los habitantes de Florida.Milton se mueve a una velocidad de más de 200 km por hora en categoría 5.",
        esAnonimo: false,
        perfil: neutro
    },
    {
        userName: 'lucy',
        img: 'https://i.pinimg.com/enabled_hi/564x/96/0a/b5/960ab5c0ae223f8f3646622be2e90749.jpg',
        texto: 'acabo con la progrmacion o la programacion acaba conmigo',
        esAnonimo: true,
        perfil: hombre
    }
]

export const ListaPublicaciones = () => {
    return (
        <section className="ListaPublicaciones">
            {
                publicaciones.map(({ userName, img, texto,esAnonimo, perfil }) => (
                    <PublicacionHome
                        key={userName}
                        userName={userName}
                        img={img}
                        texto={texto}
                        esAnonimo = {esAnonimo}
                        perfil = {perfil}
                    >
                    </PublicacionHome>
                ))
            }
        </section>
    )
}
