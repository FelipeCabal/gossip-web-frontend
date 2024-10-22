import { useState } from "react"
import anonimo from '../../assets/icons/Buho.png'
import { FormComment } from "../Comentarios/FormComment";


export function PublicacionHome({ userName, img, texto, perfil, esAnonimo }) {
  const [expandir, setExpandir] = useState(false); // Controla si la publicación está extendida
  const toggleExpandir = () => setExpandir(!expandir); // Alterna el estado
  const [likeIt, setLikeIt] = useState(false)
  const heartStroke = likeIt ? '#99b4ff' : 'currentColor'
  const heartFill = likeIt ? '#99b4ff' : 'none'
  const fotoPerfil = esAnonimo ? anonimo : perfil;
  const nombre = esAnonimo ? 'anonimo' : userName;


  const handleClick = () => {
    setLikeIt(!likeIt)
  }


  const maxWords = img ? '100' : '300';
  const wordsArray = texto.split(' ');
  const truncatedText = wordsArray.length > maxWords
    ? wordsArray.slice(0, maxWords).join(' ') + '...'
    : texto;

  return (
    <>
      <div className=" place-items-center">
        <div className="max-w-[630px] max-h-[900px] bg-gray-50 place-items-center">
          <article className="flex-col border-b border-gray-400 mb-4">
            <div className="w-full flex pt-2">
              <img src={fotoPerfil} alt="perfil" className="w-20" />
              <span className="flex items-center justify-center text-xl font-bold">@{nombre}</span>
            </div>
            <aside className="flex-col flex justify-center items-center relative">
              <div className="max-w-[468px] max-h-[468px] overflow-hidden xs:max-w-[428px] xs:max-h-[428px] pr-4 pl-3">
                  <img className="w-full h-full object-cover" src={img} alt="" />
                </div>              
              <div className="w-full p-6 ">
                <span className="text-xl font-roboto">{truncatedText}</span>
              </div>
              <section className=" bottom-0 right-0 flex space-x-3 p-4 w-full">
                <div className=" absolute bottom-0 right-0 flex justify-end space-x-3 pt-6 pb-4 pr-4 w-full">
                  <button onClick={handleClick}>
                    <svg
                      data-slot="icon"
                      fill={heartFill}
                      height="27"
                      strokeWidth="2"
                      stroke={heartStroke}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z">
                      </path>
                    </svg>
                  </button>
                  <button onClick={toggleExpandir}>
                    <svg
                      fill="currentColor"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24">
                      <title>Comentar</title>
                      <path
                        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                        fill="none" stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"></path>
                    </svg>
                  </button>
                </div>
              </section>
            </aside>
            {expandir && <FormComment />}
          </article>
        </div>
      </div>

    </>
  )
}
