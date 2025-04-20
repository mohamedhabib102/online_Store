import Navbar from "../Navbar/Navbar";
import { useAuth } from "../Context/Context";
import { useEffect, useState } from "react";
import axios from "axios";
import cartEmpty from "../images/cart-empty.jfif"

function Favourite() {
    const { authToken } = useAuth();
    const [favos, setFavos] = useState([]);

    useEffect(() => {
        fetchFavo();
    }, []);

    const fetchFavo = async () => {
        try {
            const res = await axios.get("http://namehost.runasp.net/api/WishList", {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });

            const favoItems = res.data;
            const productDetails = await Promise.all(
                favoItems.map(async (wishlistItem) => {
                    try {
                        const response = await axios.get(`http://namehost.runasp.net/api/Product/${wishlistItem.productId}`, {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                                "Content-Type": "application/json",
                            },
                        });
                        return { ...response.data, wishlistId: wishlistItem.id };
                    } catch (err) {
                        console.error(err);
                        return null;
                    }
                })
            );


            setFavos(productDetails.filter((product) => product !== null));
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCartItem = async (wishlistId) => {
        try {
            const response = await axios.delete(`http://namehost.runasp.net/api/WishList/${wishlistId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                },
            });
            setFavos((prevFavos) => prevFavos.filter((favo) => favo.wishlistId !== wishlistId));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="favo">
            <Navbar />
            <div className="container">
                {favos.length === 0 ? (
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
                    >Your Favourite Is Empty</p>
                    </div>
                ) : (
                    <>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favos.map((favo, index) => {
                                    return (
                                        <tr key={favo.wishlistId}>
                                            <td>{index + 1}</td>
                                            <td>{favo.name}</td>
                                            <td>{favo.description}</td>
                                            <td>{favo.price}</td>
                                            <td>
                                                <button onClick={() => deleteCartItem(favo.wishlistId)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
}

export default Favourite;
