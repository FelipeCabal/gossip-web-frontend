import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GuiaEstilos } from './pages/GuiaEstilos';

//providers
import { AuthContextProvider } from './providers/AuthProvider';

//usuario
import { Fondo } from './pages/Usuario/Fondo';
import { Login } from './pages/Usuario/Login';
import { Register } from './pages/Usuario/Register';
import { PostForm } from './pages/PostForm/postForm';
import { ListaPublicaciones } from './components/PublicacionesHome/ListaPublicaciones';

//Paginas
import { HomePage } from './pages/HomePage/HomePage';
import { LayoutComponent } from './pages/LayoutComponent';

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
      path: '',
      element: <LayoutComponent />,
      children: [
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
          element: <HomePage />
        }
      ]
    }
  ])
  return (
    <AuthContextProvider child={<RouterProvider router={router} />} />
  )
}

export default App
