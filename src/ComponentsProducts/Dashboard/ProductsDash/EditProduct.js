import { useEffect, useState } from "react";
import  { useAuth } from "../../Context/Context"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "../Dahsboard.css"


function EditProduct(){
    const { authToken } = useAuth()
    let  { Id } = useParams();
    const navigate  = useNavigate()
    const [brand, setBrand] = useState([])
    const [edit, setEdit] = useState({name: "", description: "", price: 0, photo: "", brandId: 0})
    useEffect(() => {
        axios.get(`http://namehost.runasp.net/api/Product/${Id}`,{
            headers:{
                "Content-Type": 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((data) => setEdit(data.data))
        .catch((err) => console.log(err))
        fetchBrands()
    }, [])
    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://namehost.runasp.net/api/Brand', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setBrand(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(authToken)
    async function SendData(e){
        e.preventDefault();
        try {
            const payload = {
                name: edit.name,
                description: edit.description,
                price: edit.price,
                photoName: edit.photo,
                brandId: edit.brandId
            }
            let res = await axios.put(`http://namehost.runasp.net/api/Product/${Id}`, 
                payload, 
                {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": 'application/json'
                }
            });
            navigate("/dashboard/products")
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log(error.response.data);
            }
        }
    }
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setEdit((prevState) => ({
            ...prevState,
            [name]: name === "price" || name === "brandId" ? Number(value) : value,
        }));
    };
    
    return(
        <>
        <div>
            <form
            onSubmit={SendData} 
            className="form"
            >
                <input  
                type="text" 
                placeholder="Name Product"
                value={edit.name || ""}
                onChange={handleChange}
                name="name"
                />
                <input  
                type="text" 
                placeholder="Dec Product"
                value={edit.description || ""}
                onChange={handleChange}
                name="description"
                />
                <input  
                type="number" 
                placeholder="Price Product"
                value={edit.price || 0}
                onChange={handleChange}
                name="price"
                />
                <input  
                type="text" 
                placeholder="Name Photo"
                value={edit.photo || ""}
                onChange={handleChange}
                name="photo"
                />
                <select name="brandId" value={edit.brandId} onChange={handleChange}>
                    <option value="0">Select Brand</option>
                    {brand.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.id} 
                        </option>
                    ))}
                </select>
                <button type="submit" >Update Product</button>
            </form>
        </div>
        </>
    )
}


export default EditProduct;