export function FormComment({ onClose }) {
    return (
        <div className="p-3">
            <textarea
                className="w-full  border border-gray-300 p-2 text-xl"
                rows="1"
                placeholder="Escribe tu comentario..."
            ></textarea>
            <button
                className="btn btn-2"
                onClick={onClose}
            >
                Enviar
            </button>
        </div>
    );
}