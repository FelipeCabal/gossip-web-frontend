import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GuiaEstilos } from './pages/GuiaEstilos';
import { VistaPublicacion } from './components/vistaPublicacion/vistaPublicacion.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
import { LayoutComponent } from './pages/LayoutComponent';

//providers
import { AuthContextProvider } from './providers/AuthProvider';
import { RefreshProvider } from './providers/RefreshProvider.jsx';

//usuario
import { Fondo } from './pages/Usuario/Fondo';
import { Login } from './pages/Usuario/Login';
import { Register } from './pages/Usuario/Register';
import { PostForm } from './pages/PostForm/postForm';

//Paginas
import { HomePage } from './pages/HomePage/HomePage';
import { PerfilUsuario } from './pages/Perfil/PerfilUsuario';
import ChatComponent from './components/Chat/ChatComponent.jsx';
import { PaginaChats } from './pages/PaginaChats/paginaChats.jsx';
import { CreateGroup } from './components/createGroup/createGroup.jsx';
import { CreateComunity } from './components/createGroup/createComunity.jsx';
import { EditarPerfil } from './components/EditarPerfil/EditarPerfil.jsx';
import { BusquedaComunidades } from './components/BusquedaComunidades.jsx';
import NotFound from './utils/NotFound.jsx';
import PublicRoute from './utils/PublicRoute.jsx';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '',
      element: (
        //<PublicRoute>
        <Fondo />
        //</PublicRoute>
      ),
      children: [{
        path: '',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }]
    },
    {
      path: '',
      element: (
        <ProtectedRoute>
          <LayoutComponent />
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'search',
          element: <BusquedaComunidades />,
        },
        {
          path: 'style-guide',
          element: <GuiaEstilos />,
          children: [
            {
              path: 'postForm',
              element: <PostForm />
            }
          ]
        },
        {
          path: 'homepage',
          element: <HomePage />,
          children: [
            {
              path: 'CreateGroup',
              element: <CreateGroup />
            },
            {
              path: "CreateComunity",
              element: <CreateComunity />
            },
            {
              path: 'Postform',
              element: <PostForm />
            },
            {
              path: 'post/:post',
              element: <VistaPublicacion />
            },
          ]
        },
        {
          path: 'chats',
          element: <PaginaChats />,
          children: [
            {
              path: ':id/:type',
              element: <ChatComponent />,
            }
          ]
        },
        {
          path: 'perfil/:id',
          element: <PerfilUsuario />,
          children: [
            {
              path: 'post/:post',
              element: <VistaPublicacion />
            }
          ]
        },
        {
          path: 'update',
          element: <EditarPerfil />
        }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])
  return (
    <AuthContextProvider>
      <RefreshProvider>
        <RouterProvider router={router} />
      </RefreshProvider>
    </AuthContextProvider>
  )
}

export default App
