import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../Context/Context";
import logoAccount from "../images/default-image.jpg"
import { useState } from "react";


function Navbar(){
    const {authToken, logout, userRole, nameUser, lengths} = useAuth();
    const [nameDot, setNameDot] = useState(""); 
    const changeTitle = (title) => {
        document.title = title
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
            <div className="collapse navbar-collapse" id="navbarSupportedContent"
            
            >
                <ul className="navbar-nav m-auto mb-2 pt-3 mb-lg-0">
                <li className="nav-item">
                        <NavLink className={({isActive}) => isActive ? "nav-link p-2 active" : "nav-link p-2"}
                        onClick={() => changeTitle("Egypt Laptops")}
                        to={"/"}>Home</NavLink>
                    </li> 
                    <li className="nav-item">
                        <NavLink className={({isActive}) => isActive ? "nav-link p-2 active" : "nav-link p-2"}
                        onClick={() => changeTitle("Products")}
                        to={"/products"}>Products</NavLink>
                    </li>                  
                    <li className="nav-item">
                        <NavLink className={({isActive}) => isActive ? "nav-link p-2 active" : "nav-link p-2"}
                        onClick={() => changeTitle("Brands")}
                        to={"/brands"}>Brands</NavLink>
                    </li>
                    {
                        authToken && (
                        <>
                        <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? "nav-link p-2 active" : "nav-link p-2"}
                            onClick={() => changeTitle("Cart")}
                            to={"/cart"} >Cart <i className="fa-solid fa-cart-shopping"></i> <span
                            style={{color: "#00BCD4", fontSize: "20px"}}
                            ></span> </NavLink>
                            </li>                    
                            <li className="nav-item">
                            <NavLink className={({isActive}) => isActive ? "nav-link p-2 active" : "nav-link p-2"}
                            onClick={() => changeTitle("Favourite")}
                            to={"/favourite"} >Favourite <i className="fa-solid fa-heart"></i></NavLink>
                        </li> 
                        </>
                        )
                    } 
                </ul>
                <div className="buttons">
                    {
                        authToken && nameUser ? (
                            <>
                            <div className="user">
                                <p>{
                                    nameUser.length >= 8 ?
                                    nameUser.slice(0, 5)
                                    :
                                    nameUser
                                    }</p>
                                <img src={logoAccount}  alt="Default Account" />
                            </div>
                            <Link  onClick={() => logout()}>
                            <button>Logout</button>
                            </Link>
                            </>
                        ) 
                        :
                        (
                        <>
                            <Link
                            to={"/register"}
                            onClick={() => changeTitle("Register")}
                            >
                            <button>Register</button>
                            </Link>
                            <Link
                            to={"/login"}
                            onClick={() => changeTitle("Login")}
                            >
                            <button>Login</button>
                            </Link>
                        </>
                        )
                    }
                    {
                        userRole && userRole.includes("Admin") && (
                            <Link to={"/dashboard"}
                            onClick={() => changeTitle("Dashboard")}
                            >
                            <button>Dahsboard</button>
                            </Link>
                        )
                    }
                </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar;