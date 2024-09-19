import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './providers/AuthProvider';

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

    }
  ])
  return (
    <AuthContextProvider child={<RouterProvider router={router} />} />
  )
}

export default App
