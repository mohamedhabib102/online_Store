import { Link } from "react-router-dom";
import "./Header.css";



function Header(){
    const goToHoem = () => {
        window.location.href = "/"
    }
    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Egypt <span>Laptop</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <div className="navbar-nav ms-auto mb-2 pt-3 mb-lg-0 pt-0">
                    <div className="buttons">
                        <button
                        onClick={() => goToHoem()} 
                        >Go to WebSite</button>
                    </div>
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Header;