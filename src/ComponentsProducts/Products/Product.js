import axios from "axios";
import Navbar from "../Navbar/Navbar"
import "./Product.css"
import { useEffect, useState} from "react";
import img1 from "../images/Test.jfif"
import img2 from "../images/Test1.jfif"
import img3 from "../images/Test2.jfif"
import img4 from "../images/Test3.jfif"
import img5 from "../images/Test155.jfif"
import img6 from "../images/sadsad.jfif"
import { useAuth } from "../Context/Context";



const arrImage = [img1, img2, img3, img4, img5, img6]



function Product(){
    const { authToken, linkProxy, setHandleShowProducts, handleShowProducts} = useAuth();
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [product, setProduct] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`${linkProxy}http://namehost.runasp.net/api/Product`);
            setProduct(res.data)
        }
        getProducts()
        setHandleShowProducts(false);
    }, [])
    const addToCarts = async (product, quantity) => {
        try{
            const res = await axios.post(`${linkProxy}http://namehost.runasp.net/api/Cart`,
                {
                    productId: product,
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch(error){
            console.log(error)
        }
    }
    const addToFavos = async (product) => {
        try{
            const res = await axios.post(`${linkProxy}http://namehost.runasp.net/api/WishList`,
                {
                    productId: product,
                },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch(error){
            console.log(error)
        }
    }
    const messageAddProduct = (name) => {
        setMessage(`Your Added ${name}`);
        setVisible(true)
        setTimeout(() => {
            setMessage("")
            setVisible(false)
        }, 5000);
    }
    const messageStyle = {
        opacity: visible ? 1 : 0,
        transition: "opacity 5s ease-in-out",
    };
    return(
    <>
    {!handleShowProducts ? (
      <Navbar />      
    ) : ""}
        <div className="products">
            {
                message && (
                <p
                className="message-product"
                style={messageStyle}
                >
                <span>
                    <i className="fa-solid fa-x"></i>
                </span>
                {message}
                </p>
                )
            }
            <div className="container">
                <div className="row">
                    {
                        product.map((product, index) => (
                            <div className="col-lg-4 col-md-6 col-12" key={product.id}>
                            <div className="product">
                                <img src={arrImage[index]} alt={product.photo} title={product.photo}/>
                                <h3>{product.name}</h3>
                                <div>
                                <p>{product.description}</p>
                                <p>{product.price}$</p>
                                </div>
                                <div className="actions">
                                    {
                                        authToken &&(
                                        <>
                                        <button onClick={() => {
                                        addToCarts(product.id, 1)
                                        messageAddProduct(product.name)
                                        }}>add To Cart</button>
                                        <button
                                        onClick={() => {
                                            addToFavos(product.id)
                                            messageAddProduct(product.name)
                                        }}
                                        >add To Favo</button>
                                        </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
    )
}

export default Product;