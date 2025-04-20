import "../Dahsboard.css"
import { useEffect, useState } from "react";
import  { useAuth } from "../../Context/Context"
import axios from "axios";
import { Link } from "react-router-dom";

function Brand(){
    const { authToken } = useAuth()
    const [brand, setBrand] = useState([]);
    useEffect(() => {
        getAllBarnds()
    }, [])

    const getAllBarnds = () => {
        axios.get("http://namehost.runasp.net/api/Brand",{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        }
        )
        .then((data) => setBrand(data.data))
        .catch((err) => console.log(err))
    }
    const deleteBrand = (id) => {
        axios.delete(`http://namehost.runasp.net/api/Brand/${id}`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((brand) => {
            getAllBarnds()
        })
    }
        return(
        <>
        <Link to="addBrand" className="add-newproduct"><button>Add New brand</button></Link>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Decripation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    brand.map((brand, index) => {
                        return(
                        <tr key={brand.id}>
                            <td>{index + 1}</td>
                            <td>{brand.name}</td>
                            <td>{brand.description}</td>
                            <td>
                                <button 
                                style={{marginRight: "5px"}}
                                onClick={() => deleteBrand(brand.id)}
                                >Delete</button>
                                <Link to={`editBrand/${brand.id}`} >
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


export default Brand;