import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GuiaEstilos } from './pages/GuiaEstilos';


const Login = () => {
  return <h1>Holaaaa</h1>
}
const Register = () => {
  return <h2>Registro</h2>
}

const App = () => {

  const router = createBrowserRouter([
    {
      path: '',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />

    },
    {
      path: '/style-guide',
      element: <GuiaEstilos />
    },
    {
      path: '/navbar',
      element: <navbar />
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
