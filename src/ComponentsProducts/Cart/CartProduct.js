import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Context/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AllData.css";
import cartEmpty from "../images/cart-empty.jfif"

function CartProduct() {
    const [carts, setCarts] = useState([]);
    const [totalP, setTotalP] = useState("")
    const { authToken, savePrice } = useAuth();
    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (carts.length > 0) {
            const totalPrice = carts.reduce((total, cart) => {
                return total + cart.price * cart.quantity;
            }, 0);
            savePrice(carts.length, totalPrice);
        }
    }, [carts, savePrice]);

    const fetchCart = async () => {
        try {
            const res = await axios.get("http://namehost.runasp.net/api/Cart", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });

            const cartItems = res.data.reduce((acc, item) => {
                const existingItem = acc.find((i) => i.productId === item.productId);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                } else {
                    acc.push({ ...item, quantity: item.quantity });
                }
                return acc;
            }, []);

            const productDetails = await Promise.all(
                cartItems.map(async (cartItem) => {
                    try {
                        const response = await axios.get(`http://namehost.runasp.net/api/Product/${cartItem.productId}`, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                                "Content-Type": "application/json"
                            }
                        });
                        return { ...response.data, wishlistId: cartItem.id, quantity: cartItem.quantity };
                    } catch (err) {
                        console.error(err);
                        return null;
                    }
                })
            );

            setCarts(productDetails.filter((product) => product !== null));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCartItem = async (wishlistId) => {
        try {
            const response = await axios.delete(`http://namehost.runasp.net/api/Cart/${wishlistId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json"
                }
            });
            setCarts((prevCarts) => prevCarts.filter((cart) => cart.wishlistId !== wishlistId));
        } catch (error) {
            console.error(error);
        }
    };

    const increaseQuantity = (wishlistId) => {
        setCarts((prevCarts) =>
            prevCarts.map((cart) =>
                cart.wishlistId === wishlistId ? { ...cart, quantity: cart.quantity + 1 } : cart
            )
        );
    };

    const decreaseQuantity = (wishlistId) => {
        setCarts((prevCarts) =>
            prevCarts.map((cart) =>
                cart.wishlistId === wishlistId && cart.quantity > 1
                    ? { ...cart, quantity: cart.quantity - 1 }
                    : cart
            )
        );
    };

    const totalPrices = () => {
        return carts.reduce((total, cart) => {
            const totals = total + cart.price * cart.quantity;
            return totals;
        }, 0)
    }
    return (
        <div className="cart">
            <Navbar />
            <div className="container">
                {
                    carts.length === 0 ? 
                    <div style={{textAlign: "center"}}>
                    <img src={cartEmpty} title="empty"/>
                    <p
                    style={{
                        textAlign: "center",
                        padding: "10px",
                        fontSize: "22px",
                        color: "#00BCD4",
                        margin: "0"
                    }}
                    >Your Cart Is Empty</p>
                    </div>
                    :
                    <>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart, index) => (
                            <tr key={cart.wishlistId}>
                                <td>{index + 1}</td>
                                <td>{cart.name}</td>
                                <td>{cart.description}</td>
                                <td>{cart.price}</td>
                                <td>
                                    <button onClick={() => decreaseQuantity(cart.wishlistId)}>-</button>
                                    {cart.quantity}
                                    <button onClick={() => increaseQuantity(cart.wishlistId)}>+</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteCartItem(cart.wishlistId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Total: <span>{totalPrices()}</span></p>
                <Link  to="payment" className="payment-button">Payment <i className="fa-regular fa-credit-card"></i></Link>
                </>
                }
            </div>
        </div>
    );
}

export default CartProduct;
