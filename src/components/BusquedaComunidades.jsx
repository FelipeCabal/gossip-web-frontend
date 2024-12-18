import { useEffect, useState } from 'react';
import axios from 'axios';
import foto from '../assets/avatares/neutro.png'
import { useParams } from 'react-router-dom';
import { useRefresh } from '../providers/RefreshProvider';
import { useAuth } from '../providers/AuthProvider';
import { toast, ToastContainer } from 'react-toastify';


export function BusquedaComunidades() {
  const API_ENDPOINT_PEOPLE = process.env.REACT_APP_API + '/users'
  const API_ENDPOINT_COMUNIDADES = process.env.REACT_APP_API + '/chats/community'
  const API_ENDPOINT_INVITACIONES = process.env.REACT_APP_API + '/chats/group-invitation'
  const API_ENDPOINT_SOLICITUDES = process.env.REACT_APP_API + '/friend-request/user'
  const [communities, setCommunities] = useState([]);
  const { usuario } = useAuth()
  const [people, setPeople] = useState([]);
  const { id } = useParams
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [activeSection, setActiveSection] = useState('personas'); // Estado para alternar secciones
  const { refresh, setRefresh } = useRefresh()
  let enpoint = ""
  const toggleFollow = (list, setList, id) => {

    const selectedItem = list.find((item) => item.id === id);

    if (!selectedItem) {
      console.error("No se encontró el usuario/comunidad con el ID:", id);
      return;
    }
    enpoint = process.env.REACT_APP_API + (activeSection === 'personas' ? `/friend-request/request/${id}` : `/chats/community/${id}/miembros`)

    if (activeSection === 'personas') {
      axios.post(enpoint, { status: 'P' })
        .then(() => {
          setRefresh(true)
          console.log("Solicitud enviada con éxito para el ID:", id);
        })
        .catch((error) => {
          console.error("Error al enviar la solicitud:", error);
        });
    } else {
      axios.post(enpoint)
        .then((r) => {
          toast.success("¡Te has unido a la comunidad exitosamente!");
        })
        .catch((e) => {
          toast.error("Hubo un error al intentar unirte a la comunidad.");
        })
    }
  };

  useEffect(() => {
    axios
      .get(API_ENDPOINT_PEOPLE)
      .then((respuesta) => {
        const peopleWithFollowing = respuesta.data.map((persona) => ({
          ...persona,
        }));
        setPeople(peopleWithFollowing);
      })
      .catch((error) => {
        console.log("Este es el error", error);
      });
  }, []);


  useEffect(() => {
    axios
      .get(API_ENDPOINT_COMUNIDADES)
      .then((respuesta) => {
        const communitiesWithFollowing = respuesta.data.map((comunidad) => ({
          ...comunidad,
        }));
        setCommunities(communitiesWithFollowing);
      })
      .catch((error) => {
        console.log("Este es el error de comunidades", error);
      });
  }, [refresh]);

  const [solicitudes, setSolicitudes] = useState([])

  useEffect(() => {
    axios
      .get(API_ENDPOINT_SOLICITUDES)
      .then((respuesta) => {
        setSolicitudes(respuesta.data)
        console.log(respuesta.data)
      })
      .catch((error) => {
        console.log("Este es el error de solicitudes: ", error);
      });
  }, [refresh]);

  const verificar_solicitudes = (idUser) => {
    return solicitudes.some((solicitud) => (solicitud.userEnvia.id === idUser || solicitud.userRecibe.id === idUser)
    )
  }

  const [invitaciones, setInvitaciones] = useState([])

  useEffect(() => {
    axios.get(API_ENDPOINT_INVITACIONES)
      .then((respuesta) => {
        setInvitaciones(respuesta.data)
        console.log('respuesta invitaciones', respuesta.data)
      })
      .catch((error) => {
        console.los("error en las invitaciones", error)
      })
  }, [])

  // Filtrar resultados basados en el término de búsqueda
  const filteredPeople = people.filter((persona) =>
    persona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCommunities = communities.filter((comunidad) =>
    comunidad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick />

      <div className='w-full h-full overflow-y-auto'>
        <section className="flex border-b border-gray-400">
          <div className="w-full pb-3 pt-2 flex items-center justify-center">
            <form action="" className="w-full flex items-center justify-center">
              <div className="flex items-center border rounded-2xl bg-gray-200 m-2 w-[85%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-600 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Escribe el nombre de la persona o comunidad"
                  className="w-full bg-transparent outline-none border-none text-gray-700 placeholder-gray-600 focus:ring-0 focus:outline-none text-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
                />
              </div>
            </form>
          </div>
        </section>

        <section className="flex flex-col-2 justify-around">
          <div className="items-center">
            <h3
              onClick={() => setActiveSection('personas')}
              className={`cursor-pointer text-3xl font-normal flex items-center justify-center mb-2 ${activeSection === 'personas' ? 'text-black' : 'text-gray-500'
                }`}
            >
              Personas
            </h3>
            <div
              className={`flex flex-col items-center justify-between text-white text-sm ${activeSection === 'personas' ? 'block' : 'hidden'
                }`}
            >
              {filteredPeople.map((persona) => (
                < article key={persona.id} className="flex w-full items-start justify-start gap-4 mb-4" >
                  <div className="flex items-center gap-1">
                    <img
                      src={persona.imagen || foto}
                      alt={`Perfil de ${persona.nombre}`}
                      className="w-20 h-20 rounded-full"
                    ></img>
                    <div className="flex flex-col w-[70px]">
                      <span className="text-black font-semibold text-xl ml-2">{persona.nombre}</span>
                    </div>
                  </div>
                  <div>
                    {verificar_solicitudes(persona.id) === true ? <></> :
                      <button
                        onClick={() => toggleFollow(people, setPeople, persona.id)}
                        className={'btn btn-font-black border border-blue-500 text-white'
                        }>
                        añadir
                      </button>
                    }

                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="items-start justify-start">
            <h3 onClick={() => setActiveSection('comunidades')}
              className={`cursor-pointer text-3xl font-normal flex items-center justify-center mb-2 ${activeSection === 'comunidades' ? 'text-black' : 'text-gray-500'
                }`} >
              Comunidades
            </h3>
            <div
              className={`flex w-full flex-col items-start justify-between text-white text-sm ${activeSection === 'comunidades' ? 'block' : 'hidden'
                }`}
            >
              {filteredCommunities.map((comunidad) => (
                <article
                  key={comunidad.id}
                  className="flex items-start gap-4 mb-4 justify-start"
                >
                  <div className="flex items-center gap-1">
                    <img
                      src={comunidad.perfil || foto}
                      alt={`Perfil de ${comunidad.nombre}`}
                      className="w-20 h-20 rounded-full"
                    />
                    <div className="flex flex-col w-[100px]">
                      <span className="text-black font-semibold text-xl">{comunidad.nombre}</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toggleFollow(communities, setCommunities, comunidad.id)
                    }
                    className={'btn btn-font-black border border-blue-500 text-white'}
                  >
                    {
                      activeSection == 'personas' ? <p className='font-bold'>añadir</p> : <p className='font-bold'>unirme</p>
                    }
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section >
      </div >
    </>
  );
}
