import { Outlet } from "react-router-dom";
import Navbar from "../partials/navbar";


export function LayoutComponent() {
    return (<>
        <Navbar/>
        <div>
            <Outlet></Outlet>
        </div>
    </>
    )
}

