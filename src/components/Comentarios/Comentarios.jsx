import { CardComentario } from './CardComentario'

import mujer from '../../assets/avatares/mujer.png'
import hombre from '../../assets/avatares/hombre.png'
import neutro from '../../assets/avatares/neutro.png'

const lista = [
    {
        userName: 'Rulo Ricardo',
        texto: 'pero mas bonito estas tu',
        esAnonimo: false,
        perfil: mujer
    },
    {
        userName: 'Rulo Ronaldo',
        texto: 'mmmmm',
        esAnonimo: false,
        perfil: hombre
    },
    {
        userName: 'Carlos',
        texto: 'astetik*',
        esAnonimo: false,
        perfil: hombre
    },
    {
        userName: 'LaGatos',
        texto: 'a mi tambien me encantan los gatos',
        esAnonimo: false,
        perfil: mujer
    },
    {
        userName: 'taylor',
        texto: 'el huracan ya pasooo',
        esAnonimo: false,
        perfil: neutro
    },
    {
        userName: 'lucy',
        texto: 'la verdad no te entendi nada',
        esAnonimo: true,
        perfil: hombre
    }
]

export const Comentarios = () => {
  return (
      <div>
          {
              lista.map(({ userName, texto, perfil }) => (
                  <CardComentario
                      key={userName}
                      userName={userName}
                      texto={texto}
                      perfil={perfil}
                  >
                      
                  </CardComentario>
              ))
          }
      </div>
  )
}
