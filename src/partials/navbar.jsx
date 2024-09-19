import { Link } from "react-scroll"
const navbar = () => {
    const content = <>
        <div className="">
            <ul>
                <Link to="home" smooth={true} duration={500}>
                    <li>Home</li>
                </Link>
                <Link to="home" smooth={true} duration={500}>
                    <li>Home</li>
                </Link>
                <Link to="home" smooth={true} duration={500}>
                    <li>Home</li>
                </Link>
                <Link to="home" smooth={true} duration={500}>
                    <li>Home</li>
                </Link>
                <Link to="home" smooth={true} duration={500}>
                    <li>Home</li>
                </Link>
            </ul>
        </div>
    </>

    return (
        <div>
            {content}
        </div>
    )
}

export default navbar
