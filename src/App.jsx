import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GuiaEstilos } from './pages/GuiaEstilos';
import { VistaPublicacion } from './components/vistaPublicacion/vistaPublicacion.jsx';

//providers
import { AuthContextProvider } from './providers/AuthProvider';

//usuario
import { Fondo } from './pages/Usuario/Fondo';
import { Login } from './pages/Usuario/Login';
import { Register } from './pages/Usuario/Register';

const App = () => {

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
      path: 'style-guide',
      element: <GuiaEstilos />,
      children:[{
        path: 'modal',
        element: <VistaPublicacion />

      }
      ]
      

    }
  ])
  return (
    <AuthContextProvider child={<RouterProvider router={router} />} />
  )
}

export default App
