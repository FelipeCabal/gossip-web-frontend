export function FormComment({ onClose }) {
    const autoResize = (e) => {
        const textarea = e.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    return (
        <div className="p-3">
            <textarea onInput={autoResize}
                className="w-full text-2xl p-1 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden"
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