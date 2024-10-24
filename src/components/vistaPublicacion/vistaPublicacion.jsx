import { Link } from "react-router-dom";
import './vistaPublicacion.css'
import imagenEjemplo from "../../assets/avatares/hombre.png"
import { useEffect, useState } from "react";

export function VistaPublicacion() {
    const [Publicacion, setPublicacion]= useState([]);
    const endpoint= process.env.REACT_APP_API+ "/publicaciones"
    useEffect(() => {
        axios.get(endpoint)
        .then(res => {
            const data = res.data;
            setPublicacion (data)
        });

        
    },[]);
return <div>
            <div className="modal-fade animate__animated animate__fadeIn">
                <div className="modal-content animate__animated animate__slideInDown">
                    <div className="modal-header flex justify-between w-full">
                        <div className="flex items-center"> 
                            <img src={imagenEjemplo} alt="" className="max-w-full w-24 -mb-2" />
                            <p className="font-bold">Orlando</p>
                        </div>
                        <Link to="/style-guide" className="modal-closer">
                            <span className="material-symbols-outlined text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            </span>
                        </Link>
                    </div>
                    
                    <div>
                        <div className="w-full flex justify-center">
                            <img src={imagenEjemplo} alt=""/>
                        </div>
                        <div>
                            <p>Soy orlando y estoy solterosky por si te gustosky</p>
                        <div className="flex gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-12">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                        <p className="font-bold ">Le gusta a orlando y 20 personas mas</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    


}