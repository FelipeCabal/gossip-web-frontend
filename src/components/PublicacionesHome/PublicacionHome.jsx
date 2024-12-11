import { useEffect, useState } from "react";
import anonimo from '../../assets/icons/Buho.png';
import { FormComment } from "../Comentarios/FormComment";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../providers/AuthProvider";
import { useRefresh } from "../../providers/RefreshProvider";

export function PublicacionHome({ userName, img, texto, perfil, esAnonimo, postId, }) {
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
        setLikeIt(false)
        respuesta.data.map((like) => {
          if (usuario.id == like.user.id) {
            setLikeIt(true)
          }
        })
        setRefresh(false)
      }).catch(() => setLikeIt(false))
  }, [likeIt, usuario, refresh])

  const maxWords = img ? '100' : '300';
  const wordsArray = texto.split(' ');
  const truncatedText = wordsArray.length > maxWords
    ? wordsArray.slice(0, maxWords).join(' ') + '...'
    : texto;

  const currentPath = window.location.pathname
  const pathParts = currentPath.split('/');
  let pathDireccion = ''

  if (pathParts[1] == 'homepage') {
    pathDireccion = '/homepage'
  } else {
    pathDireccion = '/' + pathParts[1] + '/' + pathParts[2]
  }

  useEffect(() => {

  })

  return (
    <>
      <div className="w-full h-auto overflow-hidden flex justify-center place-items-center">
        <div className="w-full h-auto overflow-hidden max-h-[900px] bg-gray-50 place-items-center sm:w-3/4">
          <article className="w-full h-full overflow-hidden flex-col border-b border-gray-400 mb-2">
            <div className="w-full  flex justify-between">
              <div className="flex pt-2 pl-2 pb-2 gap-2">
                <img src={fotoPerfil} alt="perfil" className="w-20 h-20 rounded-full object-cover" />
                <span className="flex items-center justify-center text-xl font-bold">@{nombre}</span>
              </div>
              <button className="flex items-start pt-4 pr-2 pb-2 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

              </button>
            </div>
            <aside className="flex-col flex justify-center items-center relative">
              <Link to={pathDireccion + '/post/' + postId}>
                <div className="max-w-[468px] max-h-[468px] overflow-hidden xs:max-w-[428px] xs:max-h-[428px] pr-4 pl-3">
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
