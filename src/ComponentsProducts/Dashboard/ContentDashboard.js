import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "./Header/Header";
import "./Dahsboard.css";



function ContentDashboard(){
    const currentLink = document.location.href;
    if (document.location.href === currentLink){
        document.title = "Dashboard"
    }
    return(
    <>
    <Header />
    <div className="dashboard">
        <div className="sidebar">
            <ul>
                <li><NavLink to="users" className={
                    ({isActive}) => isActive ? "active" : ""
                }>Users</NavLink></li>
                <li><NavLink to="products"  className={
                    ({isActive}) => isActive ? "active" : ""
                }>Products</NavLink></li>
                <li><NavLink to="brands"  className={
                    ({isActive}) => isActive ? "active" : ""
                }>Brnads</NavLink></li>
            </ul>
        </div>
        <div className="content-of-side">
            <Outlet />
        </div>
    </div>
    </>
    )
}

export default ContentDashboard;