import "../Dahsboard.css"
import { useEffect, useState } from "react";
import  { useAuth } from "../../Context/Context"
import axios from "axios";
import { Link } from "react-router-dom";

function ProductsD(){
    const { authToken, linkProxy } = useAuth()
    const [product, setProduct] = useState([]);
    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = () => {
        axios.get(`${linkProxy}http://namehost.runasp.net/api/Product`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        }
        )
        .then((data) => setProduct(data.data))
        .catch((err) => console.log(err))
    }
    const deleteProduct = (id) => {
        axios.delete(`${linkProxy}http://namehost.runasp.net/api/Product/${id}`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((product) => {
            console.log(product) 
            getAllProducts()
        })
    }
        return(
        <>
        <Link to="addProduct" className="add-newproduct" ><button>Add New Product</button></Link>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Decripation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.map((product, index) => {
                        return(
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <button 
                                style={{marginRight: "5px"}}
                                onClick={() => deleteProduct(product.id)}
                                >Delete</button>
                                <Link to={`edit/${product.id}`}>
                                <button>Edit</button>
                                </Link>
                            </td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </>
    )
}


export default ProductsD;