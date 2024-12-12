import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="text-center p-[50px]">
            <h1 className="text-[8rem] text-cyan-600">404</h1>
            <h2 className="text-[4rem] m-[20px 0]">Página no encontrada</h2>
            <p className="text-[2rem] text-gray-400 mb-[30px]">
                Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <Link to="/homepage" className="text-white bg-red-500 p-[5px] rounded-md hover:bg-red-600">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFound;
