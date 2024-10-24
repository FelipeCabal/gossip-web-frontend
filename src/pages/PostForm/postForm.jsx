import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PostHomeForm } from "../../components/postsHomeForm/postHomeForm";

export function PostForm() {
    const navigate = useNavigate();
    const modalRef = useRef(null);

    const exit = () => {
        navigate('/homepage');
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex items-center justify-center z-50">
                <div className="bg-white w-100 h-4/5 flex flex-col overflow-y-scroll lg:w-[42%] md:w-[60%] sm:w-[75%]" >
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
                    <div className="w-full">
                        <PostHomeForm context="modal" />
                    </div>
                </div>
            </div>
        </>
    );
}
