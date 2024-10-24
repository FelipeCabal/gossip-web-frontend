import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../providers/AuthProvider';

export function Login() {
    const ENDPOINT = process.env.REACT_APP_API + '/auth/login'
    const showSucess = () => toast.success("Logueado Correctamente", {
        onClose: () => {
            navigate('/Homepage');
        },
        autoClose: 2000,
    });
    const showErrorContraseña = () => toast.error("Constraseña incorrecta")
    const showErrorCorreo = () => toast.error("Usuario no encontrado")
    const { updateToken } = useAuth()
    const [datos, setDatos] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }))
    }

    const handleIngresar = () => {
        axios.post(ENDPOINT, datos)
            .then((respuesta) => {
                console.log(respuesta.data.access_token)
                updateToken(respuesta.data.access_token)
                showSucess()
            })
            .catch((error) => {
                console.log(error)
                showErrorContraseña()
                setDatos({
                    email: datos.email,
                    password: ''
                })
            })
    }
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: '#00000', // Color negro para el label cuando está enfocado
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: '#306bac', // Línea inferior en color negro sin enfoque
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: '#306bac', // Línea inferior en negro cuando está enfocado
                        },
                        '& .MuiInputBase-input': {
                            color: '#000000', // Texto dentro del campo en color negro
                        },
                        '& label': {
                            color: '#000000', // Color del label cuando no está enfocado
                            fontWeight: '700'
                        },
                    },
                },
            },
        },
    });
    return (<>
        <div className='logotipo-formulario'></div>
        <h1 style={{ fontSize: '25px', fontWeight: 'normal', marginTop: '-5px', marginBottom: '35px' }}>GOSSIP-WEB</h1>
        <form action="" className='formulario'>
            <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Login</h2>
            <ThemeProvider theme={theme}>
                <TextField
                    type='email'
                    id="email"
                    name='email'
                    label="E-mail"
                    value={datos.email}
                    onChange={handleChange}
                    variant="standard"

                />

                <TextField
                    id="password"
                    name='password'
                    label="Password"
                    onChange={handleChange}
                    value={datos.password}
                    variant="standard"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </ThemeProvider>
        </form>
        <button className='btn btn-3' style={{ marginBottom: '10px' }}
            onClick={handleIngresar}
        >
            Ingresar
        </button>
        <Link to={'/Register/'} style={{ fontSize: '15px', textDecoration: 'underline', color: '#306BAC' }}>Registrate</Link>
        <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
        />
    </>)
}