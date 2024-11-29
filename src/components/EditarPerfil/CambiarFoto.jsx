export function CambiarFoto({ salir }) {
    return <>
        <div className="modal-fadeFoto animate__animated animate__fadeIn">
            <div className="modal-contentFoto animate__animated animate__slideInDown">
                <div className="flex justify-end w-full cursor-pointer">
                    <span className="material-symbols-outlined text-black" onClick={salir}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    </>
}