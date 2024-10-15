import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostHomeForm } from "../../components/postsHomeForm/postHomeForm";

export function PostForm() {
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const exit = () => {
        navigate('/style-guide');
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center">
                <div className="bg-white w-2/3 h-4/5 flex flex-col overflow-y-scroll">
                    <div className="flex justify-end p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="black"
                            className="size-9 cursor-pointer"
                            onClick={exit}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div>
                        <PostHomeForm context="modal" />
                    </div>
                </div>
            </div>
        </>
    );
}
