import { useState } from "react";

const EditarPerfil = () => {
    const [formData, setFormData] = useState({
        name: "Carlitos el más bonito",
        username: "amoaminovia",
        description: "hola, soy un buhofiel",
        email: "yoqnmas123@buomail.com",
        birthDate: "",
        gender: "",
        profileImage: null,
        previewImage: "/path/to/default-image.png", // Imagen inicial por defecto
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.email.includes("@")) {
            newErrors.email = "Por favor, ingresa un correo electrónico válido.";
        }
        if (formData.name.length < 3) {
            newErrors.name = "El nombre debe tener al menos 3 caracteres.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                profileImage: file,
                previewImage: URL.createObjectURL(file),
            });
        }
    };

    const handleUpdate = () => {
        if (validate()) {
            console.log("Datos guardados:", formData);
            // Aquí puedes agregar la lógica para guardar en la base de datos
        }
    };

    const handleDiscard = () => {
        setFormData({
            ...formData,
            name: "Carlitos el más bonito",
            username: "amoaminovia",
            description: "hola, soy un buhofiel",
            email: "yoqnmas123@buomail.com",
            birthDate: "",
            gender: "",
            profileImage: null,
            previewImage: "/path/to/default-image.png",
        });
        setErrors({});
    };

    return (
        <div className="mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-center mb-4">Foto de Perfil</h2>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={formData.previewImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover mb-4"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
            </div>

            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre de usuario:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Correo electrónico:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de nacimiento:</label>
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Género:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Seleccionar</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="other">Otro</option>
                    </select>
                </div>
            </form>

            <div className="flex justify-between mt-6">
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 btn btn-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300"
                >
                    Actualizar
                </button>
                <button
                    onClick={handleDiscard}
                    className="px-4 py-2 btn btn-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:ring focus:ring-red-300"
                >
                    Descartar
                </button>
            </div>
        </div>
    );
};

export default EditarPerfil;
