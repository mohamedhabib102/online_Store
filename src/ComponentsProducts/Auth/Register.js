import { useState } from "react";
import "./MainStyle.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";



function Register(){
    const [fname, setFName] = useState("");
    const [lname, setLName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [passwordr, setPasswordr] = useState("");
    const [accept, setAccept] = useState(false);
    const [errorPass, setErrorPass] = useState(false)


    const handelPassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            setErrorPass("Password must contain at least 8 characters");
            return false;
        } else{
            setErrorPass("");
            return true;
        }
    };


    async function submitRegister(e){
        e.preventDefault()
        if(!handelPassword(password)){
            return;
        }
        

        try{
            let res = await axios.post("http://namehost.runasp.net/api/Account/Register", {
                header:{
                    "Content-Type": "application/json"
                },
                firstName: fname,
                lastName: lname,
                userName: userName,
                email: email,
                password: password  
            })
            window.location.href = "/login";
            console.log(res);
        }catch(error){
                console.error("Error during registration:", error);
                setErrorPass("An error occurred");
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
                    <h2>Register</h2>
                <div className="box"> 
                    <input 
                    type="text" 
                    placeholder="First Name"
                    required
                    id="F-name"
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                    />
                    <label htmlFor="F-name">First Name:</label>
                </div>
                <div className="box"> 
                    <input 
                    type="text" 
                    placeholder="Last Name"
                    required
                    id="L-name"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                    />
                    <label htmlFor="L-name">Last Name:</label>
                </div>
                <div className="box"> 
                    <input 
                    type="text" 
                    placeholder="User Name"
                    required
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                    <label htmlFor="userName">User Name:</label>
                </div>
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
                {/* <div className="box"> 
                    <input 
                    type="password" 
                    placeholder="Repeat Password"
                    autoComplete="new-password"
                    required
                    id="r-password"
                    value={passwordr}
                    onChange={(e) => setPasswordr(e.target.value)}
                    />
                    <label htmlFor="r-password">Repeat Password:</label>
                </div> */}
                <button type="submit">Register</button>
                {
                    errorPass && (
                        <p
                        style=
                        {{
                            fontSize: "14px", 
                            marginTop: "10px", 
                            color: "red"
                        }} 
                        >{errorPass}</p>
                    )
                }
                </form>
            </div>
            </div>
        </div>
    )
}

export default Register