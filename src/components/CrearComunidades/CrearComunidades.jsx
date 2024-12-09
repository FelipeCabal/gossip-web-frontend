import React from "react";

const CrearComunidadModal = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-3xl shadow-lg w-11/12 md:w-11/12 lg:w-3/4 xl:w-2/3 p-48 relative">
                <div className="flex justify-center">
                    <h2 className="text-5xl font-semibold text-gray-800 mb-12">Crear comunidad</h2>
                </div>

                {/* Input Fields */}
                <div className='mt-10 -mx-40 flex border-gray-300 rounded-lg shadow-md'>
                    <label
                        htmlFor="community-name"
                        className="mx-6 mt-4 font-bold"
                    >
                        Nombre de la comunidad:
                    </label>
                    <input
                        type="text"
                        id="community-name"
                        placeholder="La Comunidad del pan"
                        className="w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-blue-500"
                    />
                </div>

                <div className="mt-10 -mx-40 flex border-gray-300 rounded-lg shadow-md">
                    <label
                        htmlFor="community-description"
                        className="mx-6 mt-4 font-bold"
                    >
                        Descripción:
                    </label>
                    <input
                        type="text"
                        id="community-description"
                        placeholder="Aquí solo hablamos de pan"
                        className="w-full mr-5 mb-6 mt-5 rounded-lg shadow-md border border-b-2 border-b-blue-500"
                    />
                </div>
                <br />

                {/* Image Upload Button */}
                <button
                    type="button"
                    className="w-full text-center py-6 px-4 bg-gray-200 rounded-md text-sm text-gray-600 hover:bg-gray-300 mb-4"
                >
                    Cargar imagen
                </button>
                <br />
                <br />
                {/* Action Buttons */}
                <div className="flex justify-center space-x-28">
                    <button
                        type="button"
                        className="px-4 py-2 btn btn-2 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                    >
                        Aceptar
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 btn btn-4 text-white text-sm font-medium rounded-md hover:bg-red-600"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CrearComunidadModal;
