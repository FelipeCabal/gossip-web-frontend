
import { Link } from "react-router-dom"
import "./logout.css"
import { useAuth } from "../providers/AuthProvider"
export function Logout({ salir, userId }) {
    const { deleteToken } = useAuth()
    const Logout = () => {
        deleteToken()
    }
    return <>
        <div className="modal-fadelogout animate__animated animate__fadeIn">
            <div className="modal-contentlogout animate__animated animate__slideInDown">
                <div className="flex justify-end w-full cursor-pointer" onClick={() => salir()}>
                    <span className="material-symbols-outlined text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div className="w-full h-full flex justify-center items-center -mt-10">
                    <div className="w-[60%] flex justify-between">
                        <Link onClick={() => salir()} to={"/perfil/" + userId} className="btn btn-1">ver perfil</Link>
                        <button onClick={() => Logout()} className="btn btn-4">cerrar sesion</button>
                    </div>

                </div>
            </div>
        </div>

    </>
}