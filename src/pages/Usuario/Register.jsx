import { createTheme, IconButton, InputAdornment, TextField, ThemeProvider } from '@mui/material'
import './Fondo.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { Password, Update, Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../../providers/AuthProvider';


export function Register() {
    const ENDPOINT = process.env.REACT_APP_API + '/auth/register'
    const navigate = useNavigate()
    const showErrorInformacion = () => toast.info("Campos sin informacion")
    const showSucess = () => toast.success("Registrado Correctamente", {
        onClose: () => {
            navigate('/Homepage');
        },
        autoClose: 2000,
    });
    const showErrorPeticion = () => toast.error("Usuario ya existe")

    const { updateToken } = useAuth()

    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        fechaNto: "",
        sexo: "",
        password: "",
        pais: ""
    })

    const handleIngresar = () => {
        if (!datos.nombre || !datos.email || !datos.password || !datos.fechaNto || !datos.sexo || !datos.pais) {
            showErrorInformacion();
            return;
        }
        axios.post(ENDPOINT, datos).then((respuesta) => {
            console.log(respuesta.data.access_token)
            updateToken(respuesta.data.access_token)
            showSucess()
        }).catch((error) => {
            console.log(error)
            showErrorPeticion()
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDatos(prevDatos => ({ ...prevDatos, [name]: value }))
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
            <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>Register</h2>
            <ThemeProvider theme={theme}>
                <TextField
                    type='text'
                    id="nombre"
                    name='nombre'
                    label="Nombre"
                    value={datos.nombre}
                    onChange={handleChange}
                    variant="standard"
                />
                <TextField
                    type='email'
                    id='email'
                    name='email'
                    label='email'
                    value={datos.email}
                    onChange={handleChange}
                    variant='standard'
                />
                <TextField
                    id='password'
                    name='password'
                    label='Password'
                    value={datos.password}
                    onChange={handleChange}
                    variant='standard'
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
                <TextField
                    type='date'
                    id='fechaNto'
                    name='fechaNto'
                    value={datos.fechaNto}
                    label='Fecha de Nacimiento'
                    variant='standard'
                    onChange={handleChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder=""

                />
                <TextField
                    id='sexo'
                    name='sexo'
                    type='text'
                    value={datos.sexo}
                    label='Genero'
                    variant='standard'
                    onChange={handleChange}
                />
                <TextField
                    id='pais'
                    name='pais'
                    label='País'
                    type='text'
                    value={datos.pais}
                    onChange={handleChange}
                    variant='standard'
                />
            </ThemeProvider>

        </form>
        <button className='btn btn-3' style={{ marginBottom: '10px' }}
            onClick={handleIngresar}>
            Registrarse
        </button>
        <Link to={'/'} style={{ fontSize: '15px', textDecoration: 'underline', color: '#306BAC' }}>Iniciar Sesión</Link>
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
    </>
    )
}

