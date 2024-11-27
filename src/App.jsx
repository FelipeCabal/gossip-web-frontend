import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GuiaEstilos } from './pages/GuiaEstilos';
import { VistaPublicacion } from './components/vistaPublicacion/vistaPublicacion.jsx';

//providers
import { AuthContextProvider } from './providers/AuthProvider';

//usuario
import { Fondo } from './pages/Usuario/Fondo';
import { Login } from './pages/Usuario/Login';
import { Register } from './pages/Usuario/Register';
import { PostForm } from './pages/PostForm/postForm';

//Paginas
import { HomePage } from './pages/HomePage/HomePage';
import { LayoutComponent } from './pages/LayoutComponent';
import { PerfilUsuario } from './pages/Perfil/PerfilUsuario';
import { useState } from 'react';
import { RefreshProvider } from './providers/RefreshProvider.jsx';
import { EditarPerfil } from './components/EditarPerfil/EditarPerfil.jsx';

const App = () => {
  const [refresh, setRefresh] = useState(false)

  const router = createBrowserRouter([
    {
      path: '',
      element: <Fondo />,
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
      element: <LayoutComponent />,
      children: [{
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
            path: 'Postform',
            element: <PostForm />
          },
          {
            path: 'post/:post',
            element: <VistaPublicacion />
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
          },
          {
            path: 'update',
            element: <EditarPerfil />
          }
        ]
      }
      ]
    }
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
