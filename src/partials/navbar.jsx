import { Link } from "react-scroll"
import img from "../assets/avatares/neutro.png"
import imgHome from "../assets/icons/HOMEPAGE.png"
import imgCommunity from "../assets/icons/COMMUNITYS.png"
import imgBuscar from "../assets/icons/BUSCAR.png"
import imgMensajes from "../assets/icons/MENSAJES.png"
import imgNotification from "../assets/icons/NOTIFICATIONS.png"
import imgBuho from "../assets/icons/buho.png"

const Navbar = () => {


    return (
        <header>

            <div className="w-full   flex items-center justify-center">
                <div className="w-full h-20 text-slate-950 flex items-center justify-items-start">
                    <img src={img} alt="Gossip-web" className="max-w-full w-20" />
                </div>
                <div className="w-full h-20 text-slate-950 flex items-center justify-center">
                    <h1 className="text-5xl font-bold">Gossip-Web</h1>
                </div>
                <div className="w-full h-20  text-slate-950 flex items-center justify-end">
                    <img src={imgBuho} alt="Gossip-web" className="max-w-full w-20" />
                </div>
            </div>

            <nav className="w-full bg-[#6f9ceb] border-[#306bac] border border-8">
                <div className="w-full  flex justify-center items-center text-white px-20 py-5">
                    <div className="w-full flex items-center justify-between font-normal px-4">
                        <Link to="/home">
                            <a href="/home" className="flex items-center space-x-2 hover:text-gray-300">
                                <img src={imgHome} alt="Homepage" className=" max-w-full w-10" />
                            </a>
                        </Link>
                        <Link to="/notifications">
                            <a href="/notifications" className="flex items-center space-x-2 hover:text-gray-300">
                                <img src={imgNotification} alt="Notificaciones" className=" max-w-full w-10" />
                            </a>
                        </Link>
                        <Link to="/communities">
                            <a href="/communities" className="flex items-center space-x-2 hover:text-gray-300">
                                <img src={imgCommunity} alt="Comunidades" className=" max-w-full w-10" />
                            </a>
                        </Link>
                        <Link to="/messaging">
                            <a href="/messaging" className="flex items-center space-x-2 hover:text-gray-300">
                                <img src={imgMensajes} alt="Mensajes" className=" max-w-full w-10" />
                            </a>
                        </Link>
                        <Link to="/search">
                            <a href="/search" className="flex items-center space-x-2 hover:text-gray-300">
                                <img src={imgBuscar} alt="Buscar" className=" max-w-full w-10" />
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Navbar

