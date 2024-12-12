import { useEffect, useState } from 'react';
import axios from 'axios';

export function BusquedaComunidades() {
  const API_ENDPOINT_PEOPLE = process.env.REACT_APP_API + '/users'
  const API_ENDPOINT_COMUNIDADES = process.env.REACT_APP_API + '/chats/community'
  const API_ENDPOINT_SOLICITUDES = process.env.REACT_APP_API + '/friend-request/request/'
  const [communities, setCommunities] = useState([]);
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [activeSection, setActiveSection] = useState('personas'); // Estado para alternar secciones

  const toggleFollow = (list, setList, id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
    );
    setList(updatedList);

    const selectedItem = list.find((item) => item.id === id);

    if (!selectedItem.isFollowing) {
      // Construye el endpoint dinámicamente con el `id`
      const endpoint = `${process.env.REACT_APP_API}/friend-request/request/${id}`;
      axios
        .post(endpoint, {
          status: 'P', // Estado inicial: pendiente
        })
        .then(() => {
          console.log(`Solicitud enviada con estado "P" para el ID ${id}`);
        })
        .catch((error) => {
          console.error("Error al enviar la solicitud:", error);
          // Revertir estado local en caso de error
          const revertedList = list.map((item) =>
            item.id === id ? { ...item, isFollowing: !item.isFollowing } : item
          );
          setList(revertedList);
        });
    } else {
      console.log(`Gestión adicional para eliminar seguimiento del ID ${id}`);
    }
  };

  useEffect(() => {
    axios
      .get(API_ENDPOINT_PEOPLE)
      .then((respuesta) => {
        // Agregamos `isFollowing` inicialmente como false para cada usuario
        const peopleWithFollowing = respuesta.data.map((persona) => ({
          ...persona,
          isFollowing: false, // Estado inicial
        }));
        setPeople(peopleWithFollowing);
      })
      .catch((error) => {
        console.log("Este es el error", error);
      });
  }, []); // Asegúrate de incluir el array de dependencias vacío para evitar múltiples llamadas

  useEffect(() => {
    axios
      .get(API_ENDPOINT_COMUNIDADES)
      .then((respuesta) => {
        // Agregamos `isFollowing` inicialmente como false para cada comunidad
        const communitiesWithFollowing = respuesta.data.map((comunidad) => ({
          ...comunidad,
          isFollowing: false, // Estado inicial
        }));
        setCommunities(communitiesWithFollowing);
      })
      .catch((error) => {
        console.log("Este es el error de comunidades", error);
      });
  }, []);


  // Filtrar resultados basados en el término de búsqueda
  const filteredPeople = people.filter((persona) =>
    persona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredCommunities = communities.filter((comunidad) =>
    comunidad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
                <article key={persona.id} className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <img
                      src={persona.imagen_perfil}
                      alt={`Perfil de ${persona.nombre}`}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col w-[70px]">
                      <span className="text-black font-medium">{persona.nombre}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => toggleFollow(people, setPeople, persona.id)}
                      className={`btn btn-font-black border ${persona.isFollowing
                        ? 'border-red-500 text-white'
                        : 'border-blue-500 text-white'
                        }`}
                    >
                      {persona.isFollowing ? 'Eliminar' : 'Añadir'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="items-start justify-start">
            <h3
              onClick={() => setActiveSection('comunidades')}
              className={`cursor-pointer text-3xl font-normal flex items-center justify-center mb-2 ${activeSection === 'comunidades' ? 'text-black' : 'text-gray-500'
                }`}
            >
              Comunidades
            </h3>
            <div
              className={`flex flex-col items-start justify-between text-white text-sm ${activeSection === 'comunidades' ? 'block' : 'hidden'
                }`}
            >
              {filteredCommunities.map((comunidad) => (
                <article
                  key={comunidad.id}
                  className="flex items-start gap-4 mb-4 justify-start"
                >
                  <div className="flex items-center gap-1">
                    <img
                      src={comunidad.perfil}
                      alt={`Perfil de ${comunidad.nombre}`}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex flex-col w-[100px]">
                      <span className="text-black font-medium">{comunidad.nombre}</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      toggleFollow(communities, setCommunities, comunidad.id)
                    }
                    className={`btn btn-font-black border ${comunidad.isFollowing
                      ? 'border-red-500 text-white'
                      : 'border-blue-500 text-white'
                      }`}
                  >
                    {comunidad.isFollowing ? 'Eliminar' : 'Añadir'}
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
