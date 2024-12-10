import { useEffect, useState } from "react";
import anonimo from '../../assets/icons/Buho.png';
import { FormComment } from "../Comentarios/FormComment";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import { useRefresh } from "../../providers/RefreshProvider";

export function PublicacionHome({ userName, img, texto, perfil, esAnonimo, postId }) {
  const { usuario } = useAuth()
  const [expandir, setExpandir] = useState(false); // Controla si la publicación está extendida
  const toggleExpandir = () => setExpandir(!expandir); // Alterna el estado
  const [likeIt, setLikeIt] = useState(false);
  const heartStroke = likeIt ? '#99b4ff' : 'currentColor';
  const heartFill = likeIt ? '#99b4ff' : 'none';
  const fotoPerfil = esAnonimo ? anonimo : perfil ? perfil : anonimo;
  const nombre = esAnonimo ? 'anonimo' : userName;
  const { refresh, setRefresh } = useRefresh();


  const handleClick = () => {
    axios.post(process.env.REACT_APP_API + "/likes/" + postId)
      .then(() => setLikeIt(!likeIt))
      .catch((error) => { console.log(error) })
  };

  useEffect(() => {
    if (!usuario) {
      return
    }
    axios.get(process.env.REACT_APP_API + "/likes/" + postId)
      .then((respuesta) => {
        setRefresh(false)
        respuesta.data.map((like) => {
          if (usuario.id == like.user.id) {
            setLikeIt(true)
          } else {
            setLikeIt(false)
          }
        })
      })
  }, [likeIt, usuario, refresh])

  const maxWords = img ? '100' : '300';
  const wordsArray = texto.split(' ');
  const truncatedText = wordsArray.length > maxWords
    ? wordsArray.slice(0, maxWords).join(' ') + '...'
    : texto;

  const currentPath = window.location.pathname;

  return (
    <>
      <div className="w-full h-auto overflow-hidden flex justify-center place-items-center">
        <div className="w-full h-auto overflow-hidden max-h-[900px] bg-gray-50 place-items-center sm:w-3/4">
          <article className="w-full h-full overflow-hidden flex-col border-b border-gray-400 mb-4">
            <div className="w-full flex pt-2 pl-1 pb-2 gap-2">
              <img src={fotoPerfil} alt="perfil" className="w-20" />
              <span className="flex items-center justify-center text-xl font-bold">@{nombre}</span>
            </div>
            <aside className="flex-col h-full overflow-hidden flex justify-center items-center relative">
              <Link className="w-full h-full overflow-hidden flex items-center text-center flex-col" to={currentPath + '/post/' + postId}>
                <div className="max-w-[720px] max-h-[468px] overflow-hidden xs:max-w-[428px] xs:max-h-[428px] pr-4 pl-3">
                  {img ? (
                    <img className="max-w h-[auto]" src={img} alt="Publicación" />
                  ) :
                    <></>
                  }
                </div>
                <div className="w-full p-6">
                  <span className="text-xl font-roboto">{truncatedText}</span>
                </div>
              </Link>

              <section className="bottom-0 right-0 flex space-x-3 p-4 w-full">
                <div className="absolute bottom-0 right-0 flex justify-end space-x-3 pt-6 pb-4 pr-4 w-full">
                  <button>
                    <svg xmlns="http://www.w3.org/2000/svg"
                      fill="none" viewBox="0 0 24 24"
                      strokeWidth={1.5} stroke="currentColor"
                      className="size-10">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </button>
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
            {expandir && <FormComment onClose={setExpandir} postid={postId} />}
          </article>
        </div>
      </div>
    </>
  );
}
