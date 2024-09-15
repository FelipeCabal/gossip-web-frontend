import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


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
      element: <Login/>
    },
    {
      path: '/register',
      element:<Register/>
      
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
