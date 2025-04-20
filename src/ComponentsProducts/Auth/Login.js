import { useState, useEffect} from "react";
import "./MainStyle.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Context/Context";


function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMesEmal, seterrMesEmal] = useState(false);
    const [errMesPass, seterrMesPass] = useState(false);
    const { login, saveName} = useAuth()
    const currentLink = document.location.href;
    if (document.location.href === currentLink){
        document.title = "Login"
    }
    async function submitRegister(e){
        e.preventDefault()
        try{
            let res = await axios.post("https://cors-anywhere.herokuapp.com/http://namehost.runasp.net/api/Account", {
                email: email,
                password: password  
            },{
            headers:{
                "Content-Type": "application/json"
            }})
            const token = res.data.token;
            const roleRes = await axios.get("https://cors-anywhere.herokuapp.com/http://namehost.runasp.net/api/Account/UserRoles", {
                params: { email: email },
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json"
                }
            });
    
            const role = roleRes.data;
            login(token, role); 
            const currentName = email;
            saveName(currentName)
            console.log(res, roleRes)
            if (role.includes("Admin")){
                window.location.href = "/dashboard"
                // console.log(true)
            } else if (role.includes("User")){
                window.location.href = "/"
                // console.log(false)
            }
        }catch(error){
            if (error.response && error.response.status){
                if (error.response.status === 400){
                    seterrMesEmal(true)
                } else if (error.response.status === 401){
                    seterrMesPass(true);
                }
            } else {
                console.log("Unexpected error:", error);
            }
        }
    } 
    return(
        <div className="register">
            <Navbar />
            <div className="content-page">
            <div className="parent">
                <form
                onSubmit={submitRegister}
                >
                    <h2>Login</h2>
                <div className="box"> 
                    <input 
                    type="email" 
                    placeholder="Your Email"
                    autoComplete="email"
                    required
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email">Your Email:</label>
                </div>
                <div className="box"> 
                    <input 
                    type="password" 
                    placeholder="Password"
                    autoComplete="new-password"
                    required
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                </div>
                <button type="submit">Login</button>
                {errMesEmal && <p style={{
                    fontSize: "13px",
                    color: "red",
                    marginTop: "6px"
                }}>Already Registered</p>}
                {errMesPass && <p style={{
                    fontSize: "13px",
                    color: "red",
                    marginTop: "6px"
                }}>Wrong Password</p>}
                </form>
            </div>
            </div>
        </div>
    )
}

export default Login