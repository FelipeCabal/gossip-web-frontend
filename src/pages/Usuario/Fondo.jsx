import { Link, Outlet } from 'react-router-dom'
import './Fondo.css'

export function Fondo() {

    return (
        <div className='fondo_login-register'>
            < div className='logotipo' ></div >
            <div className='fondo_formulario'><Outlet /></div>
        </div>
    )
}

