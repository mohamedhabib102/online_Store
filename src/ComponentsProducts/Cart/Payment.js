import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./AllData.css";
import { useAuth } from "../Context/Context";




function Payment(){
    const [activeClass, setActiveClass] = useState(0)
    const [num, setNum] = useState("");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [opacity, setOpacity] = useState(false);
    const {lengths, priceTotal} = useAuth();


    const changeClassActive = (ele) => {
        setActiveClass(ele)
    }
    const sendData = (e) =>{
        e.preventDefault()
        setNum("");
        setCode("");
        setName("");
        document.location.href = "/products";
    }
    const handelMessage = () => {
        setOpacity(true);
    }
    const myStyles = {
        opacity: opacity ? 1 : 0,
    }
    return(
    <>
        <Navbar />
        <div className="payment-methods">
            <p className="message-payment"
            style={myStyles}
            >Payment Completed Successfuly</p>
            <div className="methods">
                <div className={activeClass === 1 ? "method active" : "method"}
                onClick={() => changeClassActive(1)}
                ><i className="fa-brands fa-cc-visa fa-4x" ></i></div>
                <div className={activeClass === 2 ? "method active" : "method"}
                onClick={() => changeClassActive(2)}
                ><i  className="fa-brands fa-cc-mastercard fa-4x"></i></div>
                <div className={activeClass === 3 ? "method active" : "method"}
                onClick={() => changeClassActive(3)}
                ><i  className="fa-brands fa-cc-paypal fa-4x"></i></div>
            </div>
            <div className="detalis" onSubmit={sendData}>
                <h4>Count Products: <span>{lengths}</span></h4>
                <h4>Price: <span>{priceTotal}</span></h4>
                <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non, quam nobis inventore vel nihil perspiciatis veritatis possimus ducimus corrupti facilis consequuntur eligendi culpa nisi ad recusandae molestias autem blanditiis tempora!
                </div>
                <form>
                    <div className="box">
                        <input type="text" id="crad-num" required
                        onChange={(e) => setNum(e.target.value)}
                        value={num}
                        />
                        <label htmlFor="crad-num">CURD NUMBER</label>
                    </div>
                    <div className="date-inputs">
                        <input  type="date" id="year" required/>
                    </div>
                    <div className="box">
                        <input  type="text" id="code" required
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        />
                        <label htmlFor="code">CVV CODE</label>
                    </div>
                    <div className="box">
                    <input  type="text" id="name-card" required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    />
                    <label htmlFor="name-card">NAME ON THE CARD</label>
                    </div>
                    <button type="submit"
                    onClick={() => handelMessage()}
                    >Submit</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default Payment;